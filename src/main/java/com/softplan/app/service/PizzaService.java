package com.softplan.app.service;

import com.softplan.app.domain.Pizza;
import com.softplan.app.repository.PizzaRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing Pizza.
 */
@Service
@Transactional
public class PizzaService {

    private final Logger log = LoggerFactory.getLogger(PizzaService.class);

    private final PizzaRepository pizzaRepository;

    public PizzaService(PizzaRepository pizzaRepository) {
        this.pizzaRepository = pizzaRepository;
    }

    /**
     * Save a pizza.
     *
     * @param pizza the entity to save
     * @return the persisted entity
     */
    public Pizza save(Pizza pizza) {
        log.debug("Request to save Pizza : {}", pizza);
        return pizzaRepository.save(pizza);
    }

    /**
     * Get all the pizzas.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<Pizza> findAll(Pageable pageable) {
        log.debug("Request to get all Pizzas");
        return pizzaRepository.findAll(pageable);
    }


    /**
     * Get one pizza by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public Optional<Pizza> findOne(Long id) {
        log.debug("Request to get Pizza : {}", id);
        return pizzaRepository.findById(id);
    }

    /**
     * Delete the pizza by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete Pizza : {}", id);
        pizzaRepository.deleteById(id);
    }
}
