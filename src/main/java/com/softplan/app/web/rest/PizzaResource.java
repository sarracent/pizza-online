package com.softplan.app.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.softplan.app.domain.Pizza;
import com.softplan.app.service.PizzaService;
import com.softplan.app.web.rest.errors.BadRequestAlertException;
import com.softplan.app.web.rest.util.HeaderUtil;
import com.softplan.app.web.rest.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Pizza.
 */
@RestController
@RequestMapping("/api")
public class PizzaResource {

    private final Logger log = LoggerFactory.getLogger(PizzaResource.class);

    private static final String ENTITY_NAME = "pizza";

    private final PizzaService pizzaService;

    public PizzaResource(PizzaService pizzaService) {
        this.pizzaService = pizzaService;
    }

    /**
     * POST  /pizzas : Create a new pizza.
     *
     * @param pizza the pizza to create
     * @return the ResponseEntity with status 201 (Created) and with body the new pizza, or with status 400 (Bad Request) if the pizza has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/pizzas")
    @Timed
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<Pizza> createPizza(@Valid @RequestBody Pizza pizza) throws URISyntaxException {
        log.debug("REST request to save Pizza : {}", pizza);
        if (pizza.getId() != null) {
            throw new BadRequestAlertException("A new pizza cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Pizza result = pizzaService.save(pizza);
        return ResponseEntity.created(new URI("/api/pizzas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /pizzas : Updates an existing pizza.
     *
     * @param pizza the pizza to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated pizza,
     * or with status 400 (Bad Request) if the pizza is not valid,
     * or with status 500 (Internal Server Error) if the pizza couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/pizzas")
    @Timed
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<Pizza> updatePizza(@Valid @RequestBody Pizza pizza) throws URISyntaxException {
        log.debug("REST request to update Pizza : {}", pizza);
        if (pizza.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Pizza result = pizzaService.save(pizza);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, pizza.getId().toString()))
            .body(result);
    }

    /**
     * GET  /pizzas : get all the pizzas.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of pizzas in body
     */
    @GetMapping("/pizzas")
    @Timed
    public ResponseEntity<List<Pizza>> getAllPizzas(Pageable pageable) {
        log.debug("REST request to get a page of Pizzas");
        Page<Pizza> page = pizzaService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/pizzas");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * GET  /pizzas/:id : get the "id" pizza.
     *
     * @param id the id of the pizza to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the pizza, or with status 404 (Not Found)
     */
    @GetMapping("/pizzas/{id}")
    @Timed
    public ResponseEntity<Pizza> getPizza(@PathVariable Long id) {
        log.debug("REST request to get Pizza : {}", id);
        Optional<Pizza> pizza = pizzaService.findOne(id);
        return ResponseUtil.wrapOrNotFound(pizza);
    }

    /**
     * DELETE  /pizzas/:id : delete the "id" pizza.
     *
     * @param id the id of the pizza to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/pizzas/{id}")
    @Timed
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<Void> deletePizza(@PathVariable Long id) {
        log.debug("REST request to delete Pizza : {}", id);
        pizzaService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
