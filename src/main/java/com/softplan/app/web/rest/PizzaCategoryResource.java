package com.softplan.app.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.softplan.app.domain.PizzaCategory;
import com.softplan.app.service.PizzaCategoryService;
import com.softplan.app.web.rest.errors.BadRequestAlertException;
import com.softplan.app.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing PizzaCategory.
 */
@RestController
@RequestMapping("/api")
public class PizzaCategoryResource {

    private final Logger log = LoggerFactory.getLogger(PizzaCategoryResource.class);

    private static final String ENTITY_NAME = "pizzaCategory";

    private final PizzaCategoryService pizzaCategoryService;

    public PizzaCategoryResource(PizzaCategoryService pizzaCategoryService) {
        this.pizzaCategoryService = pizzaCategoryService;
    }

    /**
     * POST  /pizza-categories : Create a new pizzaCategory.
     *
     * @param pizzaCategory the pizzaCategory to create
     * @return the ResponseEntity with status 201 (Created) and with body the new pizzaCategory, or with status 400 (Bad Request) if the pizzaCategory has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/pizza-categories")
    @Timed
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<PizzaCategory> createPizzaCategory(@Valid @RequestBody PizzaCategory pizzaCategory) throws URISyntaxException {
        log.debug("REST request to save PizzaCategory : {}", pizzaCategory);
        if (pizzaCategory.getId() != null) {
            throw new BadRequestAlertException("A new pizzaCategory cannot already have an ID", ENTITY_NAME, "idexists");
        }
        PizzaCategory result = pizzaCategoryService.save(pizzaCategory);
        return ResponseEntity.created(new URI("/api/pizza-categories/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /pizza-categories : Updates an existing pizzaCategory.
     *
     * @param pizzaCategory the pizzaCategory to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated pizzaCategory,
     * or with status 400 (Bad Request) if the pizzaCategory is not valid,
     * or with status 500 (Internal Server Error) if the pizzaCategory couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/pizza-categories")
    @Timed
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<PizzaCategory> updatePizzaCategory(@Valid @RequestBody PizzaCategory pizzaCategory) throws URISyntaxException {
        log.debug("REST request to update PizzaCategory : {}", pizzaCategory);
        if (pizzaCategory.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        PizzaCategory result = pizzaCategoryService.save(pizzaCategory);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, pizzaCategory.getId().toString()))
            .body(result);
    }

    /**
     * GET  /pizza-categories : get all the pizzaCategories.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of pizzaCategories in body
     */
    @GetMapping("/pizza-categories")
    @Timed
    public List<PizzaCategory> getAllPizzaCategories() {
        log.debug("REST request to get all PizzaCategories");
        return pizzaCategoryService.findAll();
    }

    /**
     * GET  /pizza-categories/:id : get the "id" pizzaCategory.
     *
     * @param id the id of the pizzaCategory to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the pizzaCategory, or with status 404 (Not Found)
     */
    @GetMapping("/pizza-categories/{id}")
    @Timed
    public ResponseEntity<PizzaCategory> getPizzaCategory(@PathVariable Long id) {
        log.debug("REST request to get PizzaCategory : {}", id);
        Optional<PizzaCategory> pizzaCategory = pizzaCategoryService.findOne(id);
        return ResponseUtil.wrapOrNotFound(pizzaCategory);
    }

    /**
     * DELETE  /pizza-categories/:id : delete the "id" pizzaCategory.
     *
     * @param id the id of the pizzaCategory to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/pizza-categories/{id}")
    @Timed
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<Void> deletePizzaCategory(@PathVariable Long id) {
        log.debug("REST request to delete PizzaCategory : {}", id);
        pizzaCategoryService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
