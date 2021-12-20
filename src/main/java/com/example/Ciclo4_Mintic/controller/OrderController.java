package com.example.Ciclo4_Mintic.controller;

import java.util.List;
import java.util.Optional;

import com.example.Ciclo4_Mintic.model.Order;
import com.example.Ciclo4_Mintic.service.OrderService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import lombok.Data;


@Data
@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/order")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @GetMapping("/all")
    public List<Order> getAll(){
        return orderService.getAll();
        
    }

    @GetMapping("/{id}")
    public Optional<Order> getById(@PathVariable("id") Integer id){
        return orderService.getById(id);
    }

    @GetMapping("/zona/{zone}")
    public List<Order> getByZone(@PathVariable("zone") String zone){
        return orderService.getByZone(zone);
    }




  
    
    @PostMapping("/new")
    @ResponseStatus(HttpStatus.CREATED)
    public Order save(@RequestBody Order order){
        return orderService.registrar(order);
    }

    @PutMapping("/update")
    @ResponseStatus(HttpStatus.CREATED)
    public Order update(@RequestBody Order order){
        return orderService.update(order);
    }


    
}
