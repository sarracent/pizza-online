package com.softplan.app.service;

import com.softplan.app.domain.PizzaCategory;
import com.softplan.app.repository.PizzaCategoryRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing PizzaCategory.
 */
@Service
@Transactional
public class PizzaCategoryService {

    private final Logger log = LoggerFactory.getLogger(PizzaCategoryService.class);

    private final PizzaCategoryRepository pizzaCategoryRepository;

    public PizzaCategoryService(PizzaCategoryRepository pizzaCategoryRepository) {
        this.pizzaCategoryRepository = pizzaCategoryRepository;
    }

    /**
     * Save a pizzaCategory.
     *
     * @param pizzaCategory the entity to save
     * @return the persisted entity
     */
    public PizzaCategory save(PizzaCategory pizzaCategory) {
        log.debug("Request to save PizzaCategory : {}", pizzaCategory);
        return pizzaCategoryRepository.save(pizzaCategory);
    }

    /**
     * Get all the pizzaCategories.
     *
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<PizzaCategory> findAll() {
        log.debug("Request to get all PizzaCategories");
        return pizzaCategoryRepository.findAll();
    }


    /**
     * Get one pizzaCategory by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public Optional<PizzaCategory> findOne(Long id) {
        log.debug("Request to get PizzaCategory : {}", id);
        return pizzaCategoryRepository.findById(id);
    }

    /**
     * Delete the pizzaCategory by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete PizzaCategory : {}", id);
        pizzaCategoryRepository.deleteById(id);
    }
}
