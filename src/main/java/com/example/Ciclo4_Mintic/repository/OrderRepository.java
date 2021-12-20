package com.example.Ciclo4_Mintic.repository;

import java.util.List;
import java.util.Optional;

import com.example.Ciclo4_Mintic.model.Order;
import com.example.Ciclo4_Mintic.repository.crudRepository.OrderCrudRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class OrderRepository {

    @Autowired
    private OrderCrudRepository OrderCrudRepository;

    public List<Order> getAll(){
        return OrderCrudRepository.findAll();
    }

    public Optional <Order> getById(Integer id){
        return OrderCrudRepository.findById(id);
    }

    public List<Order> getByZone(String zone){
        return OrderCrudRepository.findByZone(zone);
    }


    public Order save(Order order){
        return OrderCrudRepository.save(order);
    }

    public void delete(Order order){
        OrderCrudRepository.delete(order);

    }



    public Optional <Order> lastOrderId(){
        return OrderCrudRepository.findTopByOrderByIdDesc();
    }

}

