package com.example.Ciclo4_Mintic.service;

import java.util.List;
import java.util.Optional;
import com.example.Ciclo4_Mintic.model.Order;
import com.example.Ciclo4_Mintic.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;



@Service
public class OrderService {
    
    @Autowired
    private OrderRepository orderRepository;

    public List<Order> getAll(){
        return orderRepository.getAll();
    }

    public Optional<Order> getById(Integer id){
        return orderRepository.getById(id);
    }

    public List<Order> getByZone(String zone){
        return orderRepository.getByZone(zone);
    }

    public Order registrar(Order order){

        //Obiene el maximo id existente en lacolección
        Optional<Order> orderidMaximo = orderRepository.lastOrderId();

        //Si el id que me envian como parametro tiene un id nulo, entonces valida el maximo id en la base de usuarios
        if (order.getId() == null){
            //valida el maximo id generado, si no hay nunguno aun, el primer id sera 1
            if (orderidMaximo.isEmpty())
            order.setId(1);
            else
                order.setId(orderidMaximo.get().getId() + 1);
            }
        
            Optional<Order> o = orderRepository.getById(order.getId());
            if (o.isEmpty()){
                return orderRepository.save(order);
            }else{
                return order;
                }
            }

    public Order update (Order order){

        if (order.getId() != null){
            Optional<Order> orderDb = orderRepository.getById(order.getId());
                    if (!orderDb.isEmpty()){
                        if (order.getStatus() != null){
                            orderDb.get().setStatus(order.getStatus());
                        }
                        
                    orderRepository.save(orderDb.get());
                    return orderDb.get();
                }else{
                    return order;
                }
            }else{
                return order;
            }
        }

            







}
