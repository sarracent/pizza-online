package com.softplan.app.web.rest;

import com.softplan.app.AppApp;

import com.softplan.app.domain.PizzaOrder;
import com.softplan.app.domain.Customer;
import com.softplan.app.repository.PizzaOrderRepository;
import com.softplan.app.service.PizzaOrderService;
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
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;


import static com.softplan.app.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.softplan.app.domain.enumeration.OrderStatus;
/**
 * Test class for the PizzaOrderResource REST controller.
 *
 * @see PizzaOrderResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = AppApp.class)
public class PizzaOrderResourceIntTest {

    private static final Instant DEFAULT_PLACED_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_PLACED_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final OrderStatus DEFAULT_STATUS = OrderStatus.COMPLETED;
    private static final OrderStatus UPDATED_STATUS = OrderStatus.PENDING;

    private static final String DEFAULT_CODE = "AAAAAAAAAA";
    private static final String UPDATED_CODE = "BBBBBBBBBB";

    @Autowired
    private PizzaOrderRepository pizzaOrderRepository;
    
    @Autowired
    private PizzaOrderService pizzaOrderService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restPizzaOrderMockMvc;

    private PizzaOrder pizzaOrder;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final PizzaOrderResource pizzaOrderResource = new PizzaOrderResource(pizzaOrderService);
        this.restPizzaOrderMockMvc = MockMvcBuilders.standaloneSetup(pizzaOrderResource)
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
    public static PizzaOrder createEntity(EntityManager em) {
        PizzaOrder pizzaOrder = new PizzaOrder()
            .placedDate(DEFAULT_PLACED_DATE)
            .status(DEFAULT_STATUS)
            .code(DEFAULT_CODE);
        // Add required entity
        Customer customer = CustomerResourceIntTest.createEntity(em);
        em.persist(customer);
        em.flush();
        pizzaOrder.setCustomer(customer);
        return pizzaOrder;
    }

    @Before
    public void initTest() {
        pizzaOrder = createEntity(em);
    }

    @Test
    @Transactional
    public void createPizzaOrder() throws Exception {
        int databaseSizeBeforeCreate = pizzaOrderRepository.findAll().size();

        // Create the PizzaOrder
        restPizzaOrderMockMvc.perform(post("/api/pizza-orders")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(pizzaOrder)))
            .andExpect(status().isCreated());

        // Validate the PizzaOrder in the database
        List<PizzaOrder> pizzaOrderList = pizzaOrderRepository.findAll();
        assertThat(pizzaOrderList).hasSize(databaseSizeBeforeCreate + 1);
        PizzaOrder testPizzaOrder = pizzaOrderList.get(pizzaOrderList.size() - 1);
        assertThat(testPizzaOrder.getPlacedDate()).isEqualTo(DEFAULT_PLACED_DATE);
        assertThat(testPizzaOrder.getStatus()).isEqualTo(DEFAULT_STATUS);
        assertThat(testPizzaOrder.getCode()).isEqualTo(DEFAULT_CODE);
    }

    @Test
    @Transactional
    public void createPizzaOrderWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = pizzaOrderRepository.findAll().size();

        // Create the PizzaOrder with an existing ID
        pizzaOrder.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPizzaOrderMockMvc.perform(post("/api/pizza-orders")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(pizzaOrder)))
            .andExpect(status().isBadRequest());

        // Validate the PizzaOrder in the database
        List<PizzaOrder> pizzaOrderList = pizzaOrderRepository.findAll();
        assertThat(pizzaOrderList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkPlacedDateIsRequired() throws Exception {
        int databaseSizeBeforeTest = pizzaOrderRepository.findAll().size();
        // set the field null
        pizzaOrder.setPlacedDate(null);

        // Create the PizzaOrder, which fails.

        restPizzaOrderMockMvc.perform(post("/api/pizza-orders")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(pizzaOrder)))
            .andExpect(status().isBadRequest());

        List<PizzaOrder> pizzaOrderList = pizzaOrderRepository.findAll();
        assertThat(pizzaOrderList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkStatusIsRequired() throws Exception {
        int databaseSizeBeforeTest = pizzaOrderRepository.findAll().size();
        // set the field null
        pizzaOrder.setStatus(null);

        // Create the PizzaOrder, which fails.

        restPizzaOrderMockMvc.perform(post("/api/pizza-orders")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(pizzaOrder)))
            .andExpect(status().isBadRequest());

        List<PizzaOrder> pizzaOrderList = pizzaOrderRepository.findAll();
        assertThat(pizzaOrderList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkCodeIsRequired() throws Exception {
        int databaseSizeBeforeTest = pizzaOrderRepository.findAll().size();
        // set the field null
        pizzaOrder.setCode(null);

        // Create the PizzaOrder, which fails.

        restPizzaOrderMockMvc.perform(post("/api/pizza-orders")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(pizzaOrder)))
            .andExpect(status().isBadRequest());

        List<PizzaOrder> pizzaOrderList = pizzaOrderRepository.findAll();
        assertThat(pizzaOrderList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllPizzaOrders() throws Exception {
        // Initialize the database
        pizzaOrderRepository.saveAndFlush(pizzaOrder);

        // Get all the pizzaOrderList
        restPizzaOrderMockMvc.perform(get("/api/pizza-orders?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(pizzaOrder.getId().intValue())))
            .andExpect(jsonPath("$.[*].placedDate").value(hasItem(DEFAULT_PLACED_DATE.toString())))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS.toString())))
            .andExpect(jsonPath("$.[*].code").value(hasItem(DEFAULT_CODE.toString())));
    }
    
    @Test
    @Transactional
    public void getPizzaOrder() throws Exception {
        // Initialize the database
        pizzaOrderRepository.saveAndFlush(pizzaOrder);

        // Get the pizzaOrder
        restPizzaOrderMockMvc.perform(get("/api/pizza-orders/{id}", pizzaOrder.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(pizzaOrder.getId().intValue()))
            .andExpect(jsonPath("$.placedDate").value(DEFAULT_PLACED_DATE.toString()))
            .andExpect(jsonPath("$.status").value(DEFAULT_STATUS.toString()))
            .andExpect(jsonPath("$.code").value(DEFAULT_CODE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingPizzaOrder() throws Exception {
        // Get the pizzaOrder
        restPizzaOrderMockMvc.perform(get("/api/pizza-orders/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePizzaOrder() throws Exception {
        // Initialize the database
        pizzaOrderService.save(pizzaOrder);

        int databaseSizeBeforeUpdate = pizzaOrderRepository.findAll().size();

        // Update the pizzaOrder
        PizzaOrder updatedPizzaOrder = pizzaOrderRepository.findById(pizzaOrder.getId()).get();
        // Disconnect from session so that the updates on updatedPizzaOrder are not directly saved in db
        em.detach(updatedPizzaOrder);
        updatedPizzaOrder
            .placedDate(UPDATED_PLACED_DATE)
            .status(UPDATED_STATUS)
            .code(UPDATED_CODE);

        restPizzaOrderMockMvc.perform(put("/api/pizza-orders")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedPizzaOrder)))
            .andExpect(status().isOk());

        // Validate the PizzaOrder in the database
        List<PizzaOrder> pizzaOrderList = pizzaOrderRepository.findAll();
        assertThat(pizzaOrderList).hasSize(databaseSizeBeforeUpdate);
        PizzaOrder testPizzaOrder = pizzaOrderList.get(pizzaOrderList.size() - 1);
        assertThat(testPizzaOrder.getPlacedDate()).isEqualTo(UPDATED_PLACED_DATE);
        assertThat(testPizzaOrder.getStatus()).isEqualTo(UPDATED_STATUS);
        assertThat(testPizzaOrder.getCode()).isEqualTo(UPDATED_CODE);
    }

    @Test
    @Transactional
    public void updateNonExistingPizzaOrder() throws Exception {
        int databaseSizeBeforeUpdate = pizzaOrderRepository.findAll().size();

        // Create the PizzaOrder

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPizzaOrderMockMvc.perform(put("/api/pizza-orders")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(pizzaOrder)))
            .andExpect(status().isBadRequest());

        // Validate the PizzaOrder in the database
        List<PizzaOrder> pizzaOrderList = pizzaOrderRepository.findAll();
        assertThat(pizzaOrderList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deletePizzaOrder() throws Exception {
        // Initialize the database
        pizzaOrderService.save(pizzaOrder);

        int databaseSizeBeforeDelete = pizzaOrderRepository.findAll().size();

        // Get the pizzaOrder
        restPizzaOrderMockMvc.perform(delete("/api/pizza-orders/{id}", pizzaOrder.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<PizzaOrder> pizzaOrderList = pizzaOrderRepository.findAll();
        assertThat(pizzaOrderList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(PizzaOrder.class);
        PizzaOrder pizzaOrder1 = new PizzaOrder();
        pizzaOrder1.setId(1L);
        PizzaOrder pizzaOrder2 = new PizzaOrder();
        pizzaOrder2.setId(pizzaOrder1.getId());
        assertThat(pizzaOrder1).isEqualTo(pizzaOrder2);
        pizzaOrder2.setId(2L);
        assertThat(pizzaOrder1).isNotEqualTo(pizzaOrder2);
        pizzaOrder1.setId(null);
        assertThat(pizzaOrder1).isNotEqualTo(pizzaOrder2);
    }
}
