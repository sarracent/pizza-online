package com.softplan.app.web.rest;

import com.softplan.app.AppApp;

import com.softplan.app.domain.Pizza;
import com.softplan.app.repository.PizzaRepository;
import com.softplan.app.service.PizzaService;
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
import org.springframework.util.Base64Utils;

import javax.persistence.EntityManager;
import java.math.BigDecimal;
import java.util.List;


import static com.softplan.app.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.softplan.app.domain.enumeration.PizzaType;
/**
 * Test class for the PizzaResource REST controller.
 *
 * @see PizzaResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = AppApp.class)
public class PizzaResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final BigDecimal DEFAULT_PRICE = new BigDecimal(0);
    private static final BigDecimal UPDATED_PRICE = new BigDecimal(1);

    private static final PizzaType DEFAULT_PIZZATYPE = PizzaType.NORMAL;
    private static final PizzaType UPDATED_PIZZATYPE = PizzaType.FAMILY;

    private static final byte[] DEFAULT_IMAGE = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_IMAGE = TestUtil.createByteArray(1, "1");
    private static final String DEFAULT_IMAGE_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_IMAGE_CONTENT_TYPE = "image/png";

    @Autowired
    private PizzaRepository pizzaRepository;
    
    @Autowired
    private PizzaService pizzaService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restPizzaMockMvc;

    private Pizza pizza;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final PizzaResource pizzaResource = new PizzaResource(pizzaService);
        this.restPizzaMockMvc = MockMvcBuilders.standaloneSetup(pizzaResource)
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
    public static Pizza createEntity(EntityManager em) {
        Pizza pizza = new Pizza()
            .name(DEFAULT_NAME)
            .description(DEFAULT_DESCRIPTION)
            .price(DEFAULT_PRICE)
            .pizzatype(DEFAULT_PIZZATYPE)
            .image(DEFAULT_IMAGE)
            .imageContentType(DEFAULT_IMAGE_CONTENT_TYPE);
        return pizza;
    }

    @Before
    public void initTest() {
        pizza = createEntity(em);
    }

    @Test
    @Transactional
    public void createPizza() throws Exception {
        int databaseSizeBeforeCreate = pizzaRepository.findAll().size();

        // Create the Pizza
        restPizzaMockMvc.perform(post("/api/pizzas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(pizza)))
            .andExpect(status().isCreated());

        // Validate the Pizza in the database
        List<Pizza> pizzaList = pizzaRepository.findAll();
        assertThat(pizzaList).hasSize(databaseSizeBeforeCreate + 1);
        Pizza testPizza = pizzaList.get(pizzaList.size() - 1);
        assertThat(testPizza.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testPizza.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testPizza.getPrice()).isEqualTo(DEFAULT_PRICE);
        assertThat(testPizza.getPizzatype()).isEqualTo(DEFAULT_PIZZATYPE);
        assertThat(testPizza.getImage()).isEqualTo(DEFAULT_IMAGE);
        assertThat(testPizza.getImageContentType()).isEqualTo(DEFAULT_IMAGE_CONTENT_TYPE);
    }

    @Test
    @Transactional
    public void createPizzaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = pizzaRepository.findAll().size();

        // Create the Pizza with an existing ID
        pizza.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPizzaMockMvc.perform(post("/api/pizzas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(pizza)))
            .andExpect(status().isBadRequest());

        // Validate the Pizza in the database
        List<Pizza> pizzaList = pizzaRepository.findAll();
        assertThat(pizzaList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = pizzaRepository.findAll().size();
        // set the field null
        pizza.setName(null);

        // Create the Pizza, which fails.

        restPizzaMockMvc.perform(post("/api/pizzas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(pizza)))
            .andExpect(status().isBadRequest());

        List<Pizza> pizzaList = pizzaRepository.findAll();
        assertThat(pizzaList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkPriceIsRequired() throws Exception {
        int databaseSizeBeforeTest = pizzaRepository.findAll().size();
        // set the field null
        pizza.setPrice(null);

        // Create the Pizza, which fails.

        restPizzaMockMvc.perform(post("/api/pizzas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(pizza)))
            .andExpect(status().isBadRequest());

        List<Pizza> pizzaList = pizzaRepository.findAll();
        assertThat(pizzaList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkPizzatypeIsRequired() throws Exception {
        int databaseSizeBeforeTest = pizzaRepository.findAll().size();
        // set the field null
        pizza.setPizzatype(null);

        // Create the Pizza, which fails.

        restPizzaMockMvc.perform(post("/api/pizzas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(pizza)))
            .andExpect(status().isBadRequest());

        List<Pizza> pizzaList = pizzaRepository.findAll();
        assertThat(pizzaList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllPizzas() throws Exception {
        // Initialize the database
        pizzaRepository.saveAndFlush(pizza);

        // Get all the pizzaList
        restPizzaMockMvc.perform(get("/api/pizzas?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(pizza.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].price").value(hasItem(DEFAULT_PRICE.intValue())))
            .andExpect(jsonPath("$.[*].pizzatype").value(hasItem(DEFAULT_PIZZATYPE.toString())))
            .andExpect(jsonPath("$.[*].imageContentType").value(hasItem(DEFAULT_IMAGE_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].image").value(hasItem(Base64Utils.encodeToString(DEFAULT_IMAGE))));
    }
    
    @Test
    @Transactional
    public void getPizza() throws Exception {
        // Initialize the database
        pizzaRepository.saveAndFlush(pizza);

        // Get the pizza
        restPizzaMockMvc.perform(get("/api/pizzas/{id}", pizza.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(pizza.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()))
            .andExpect(jsonPath("$.price").value(DEFAULT_PRICE.intValue()))
            .andExpect(jsonPath("$.pizzatype").value(DEFAULT_PIZZATYPE.toString()))
            .andExpect(jsonPath("$.imageContentType").value(DEFAULT_IMAGE_CONTENT_TYPE))
            .andExpect(jsonPath("$.image").value(Base64Utils.encodeToString(DEFAULT_IMAGE)));
    }

    @Test
    @Transactional
    public void getNonExistingPizza() throws Exception {
        // Get the pizza
        restPizzaMockMvc.perform(get("/api/pizzas/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePizza() throws Exception {
        // Initialize the database
        pizzaService.save(pizza);

        int databaseSizeBeforeUpdate = pizzaRepository.findAll().size();

        // Update the pizza
        Pizza updatedPizza = pizzaRepository.findById(pizza.getId()).get();
        // Disconnect from session so that the updates on updatedPizza are not directly saved in db
        em.detach(updatedPizza);
        updatedPizza
            .name(UPDATED_NAME)
            .description(UPDATED_DESCRIPTION)
            .price(UPDATED_PRICE)
            .pizzatype(UPDATED_PIZZATYPE)
            .image(UPDATED_IMAGE)
            .imageContentType(UPDATED_IMAGE_CONTENT_TYPE);

        restPizzaMockMvc.perform(put("/api/pizzas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedPizza)))
            .andExpect(status().isOk());

        // Validate the Pizza in the database
        List<Pizza> pizzaList = pizzaRepository.findAll();
        assertThat(pizzaList).hasSize(databaseSizeBeforeUpdate);
        Pizza testPizza = pizzaList.get(pizzaList.size() - 1);
        assertThat(testPizza.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testPizza.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testPizza.getPrice()).isEqualTo(UPDATED_PRICE);
        assertThat(testPizza.getPizzatype()).isEqualTo(UPDATED_PIZZATYPE);
        assertThat(testPizza.getImage()).isEqualTo(UPDATED_IMAGE);
        assertThat(testPizza.getImageContentType()).isEqualTo(UPDATED_IMAGE_CONTENT_TYPE);
    }

    @Test
    @Transactional
    public void updateNonExistingPizza() throws Exception {
        int databaseSizeBeforeUpdate = pizzaRepository.findAll().size();

        // Create the Pizza

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPizzaMockMvc.perform(put("/api/pizzas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(pizza)))
            .andExpect(status().isBadRequest());

        // Validate the Pizza in the database
        List<Pizza> pizzaList = pizzaRepository.findAll();
        assertThat(pizzaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deletePizza() throws Exception {
        // Initialize the database
        pizzaService.save(pizza);

        int databaseSizeBeforeDelete = pizzaRepository.findAll().size();

        // Get the pizza
        restPizzaMockMvc.perform(delete("/api/pizzas/{id}", pizza.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Pizza> pizzaList = pizzaRepository.findAll();
        assertThat(pizzaList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Pizza.class);
        Pizza pizza1 = new Pizza();
        pizza1.setId(1L);
        Pizza pizza2 = new Pizza();
        pizza2.setId(pizza1.getId());
        assertThat(pizza1).isEqualTo(pizza2);
        pizza2.setId(2L);
        assertThat(pizza1).isNotEqualTo(pizza2);
        pizza1.setId(null);
        assertThat(pizza1).isNotEqualTo(pizza2);
    }
}
