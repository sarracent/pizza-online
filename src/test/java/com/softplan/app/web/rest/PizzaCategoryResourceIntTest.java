package com.softplan.app.web.rest;

import com.softplan.app.AppApp;

import com.softplan.app.domain.PizzaCategory;
import com.softplan.app.repository.PizzaCategoryRepository;
import com.softplan.app.service.PizzaCategoryService;
import com.softplan.app.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;


import static com.softplan.app.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the PizzaCategoryResource REST controller.
 *
 * @see PizzaCategoryResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = AppApp.class)
public class PizzaCategoryResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    @Autowired
    private PizzaCategoryRepository pizzaCategoryRepository;
    
    @Autowired
    private PizzaCategoryService pizzaCategoryService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restPizzaCategoryMockMvc;

    private PizzaCategory pizzaCategory;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final PizzaCategoryResource pizzaCategoryResource = new PizzaCategoryResource(pizzaCategoryService);
        this.restPizzaCategoryMockMvc = MockMvcBuilders.standaloneSetup(pizzaCategoryResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static PizzaCategory createEntity(EntityManager em) {
        PizzaCategory pizzaCategory = new PizzaCategory()
            .name(DEFAULT_NAME)
            .description(DEFAULT_DESCRIPTION);
        return pizzaCategory;
    }

    @Before
    public void initTest() {
        pizzaCategory = createEntity(em);
    }

    @Test
    @Transactional
    public void createPizzaCategory() throws Exception {
        int databaseSizeBeforeCreate = pizzaCategoryRepository.findAll().size();

        // Create the PizzaCategory
        restPizzaCategoryMockMvc.perform(post("/api/pizza-categories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(pizzaCategory)))
            .andExpect(status().isCreated());

        // Validate the PizzaCategory in the database
        List<PizzaCategory> pizzaCategoryList = pizzaCategoryRepository.findAll();
        assertThat(pizzaCategoryList).hasSize(databaseSizeBeforeCreate + 1);
        PizzaCategory testPizzaCategory = pizzaCategoryList.get(pizzaCategoryList.size() - 1);
        assertThat(testPizzaCategory.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testPizzaCategory.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
    }

    @Test
    @Transactional
    public void createPizzaCategoryWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = pizzaCategoryRepository.findAll().size();

        // Create the PizzaCategory with an existing ID
        pizzaCategory.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPizzaCategoryMockMvc.perform(post("/api/pizza-categories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(pizzaCategory)))
            .andExpect(status().isBadRequest());

        // Validate the PizzaCategory in the database
        List<PizzaCategory> pizzaCategoryList = pizzaCategoryRepository.findAll();
        assertThat(pizzaCategoryList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = pizzaCategoryRepository.findAll().size();
        // set the field null
        pizzaCategory.setName(null);

        // Create the PizzaCategory, which fails.

        restPizzaCategoryMockMvc.perform(post("/api/pizza-categories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(pizzaCategory)))
            .andExpect(status().isBadRequest());

        List<PizzaCategory> pizzaCategoryList = pizzaCategoryRepository.findAll();
        assertThat(pizzaCategoryList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllPizzaCategories() throws Exception {
        // Initialize the database
        pizzaCategoryRepository.saveAndFlush(pizzaCategory);

        // Get all the pizzaCategoryList
        restPizzaCategoryMockMvc.perform(get("/api/pizza-categories?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(pizzaCategory.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())));
    }
    
    @Test
    @Transactional
    public void getPizzaCategory() throws Exception {
        // Initialize the database
        pizzaCategoryRepository.saveAndFlush(pizzaCategory);

        // Get the pizzaCategory
        restPizzaCategoryMockMvc.perform(get("/api/pizza-categories/{id}", pizzaCategory.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(pizzaCategory.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingPizzaCategory() throws Exception {
        // Get the pizzaCategory
        restPizzaCategoryMockMvc.perform(get("/api/pizza-categories/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePizzaCategory() throws Exception {
        // Initialize the database
        pizzaCategoryService.save(pizzaCategory);

        int databaseSizeBeforeUpdate = pizzaCategoryRepository.findAll().size();

        // Update the pizzaCategory
        PizzaCategory updatedPizzaCategory = pizzaCategoryRepository.findById(pizzaCategory.getId()).get();
        // Disconnect from session so that the updates on updatedPizzaCategory are not directly saved in db
        em.detach(updatedPizzaCategory);
        updatedPizzaCategory
            .name(UPDATED_NAME)
            .description(UPDATED_DESCRIPTION);

        restPizzaCategoryMockMvc.perform(put("/api/pizza-categories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedPizzaCategory)))
            .andExpect(status().isOk());

        // Validate the PizzaCategory in the database
        List<PizzaCategory> pizzaCategoryList = pizzaCategoryRepository.findAll();
        assertThat(pizzaCategoryList).hasSize(databaseSizeBeforeUpdate);
        PizzaCategory testPizzaCategory = pizzaCategoryList.get(pizzaCategoryList.size() - 1);
        assertThat(testPizzaCategory.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testPizzaCategory.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
    }

    @Test
    @Transactional
    public void updateNonExistingPizzaCategory() throws Exception {
        int databaseSizeBeforeUpdate = pizzaCategoryRepository.findAll().size();

        // Create the PizzaCategory

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPizzaCategoryMockMvc.perform(put("/api/pizza-categories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(pizzaCategory)))
            .andExpect(status().isBadRequest());

        // Validate the PizzaCategory in the database
        List<PizzaCategory> pizzaCategoryList = pizzaCategoryRepository.findAll();
        assertThat(pizzaCategoryList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deletePizzaCategory() throws Exception {
        // Initialize the database
        pizzaCategoryService.save(pizzaCategory);

        int databaseSizeBeforeDelete = pizzaCategoryRepository.findAll().size();

        // Get the pizzaCategory
        restPizzaCategoryMockMvc.perform(delete("/api/pizza-categories/{id}", pizzaCategory.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<PizzaCategory> pizzaCategoryList = pizzaCategoryRepository.findAll();
        assertThat(pizzaCategoryList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(PizzaCategory.class);
        PizzaCategory pizzaCategory1 = new PizzaCategory();
        pizzaCategory1.setId(1L);
        PizzaCategory pizzaCategory2 = new PizzaCategory();
        pizzaCategory2.setId(pizzaCategory1.getId());
        assertThat(pizzaCategory1).isEqualTo(pizzaCategory2);
        pizzaCategory2.setId(2L);
        assertThat(pizzaCategory1).isNotEqualTo(pizzaCategory2);
        pizzaCategory1.setId(null);
        assertThat(pizzaCategory1).isNotEqualTo(pizzaCategory2);
    }
}
