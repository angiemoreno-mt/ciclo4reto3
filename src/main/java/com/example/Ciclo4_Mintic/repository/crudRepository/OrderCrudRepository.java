package com.example.Ciclo4_Mintic.repository.crudRepository;

import java.util.List;
import java.util.Optional;

import com.example.Ciclo4_Mintic.model.Order;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

public interface OrderCrudRepository extends MongoRepository <Order, Integer> {

    //Retorna las ordenes de pedido que coinidan con la zona recibida como parametro
    @Query ("{'salesMan.zone': ?0}")
    List<Order> findByZone(final String country);

    //Retorna las ordenes x estado
    @Query ("{status: ?0}")
    List<Order> findByStatus (final String status);

    //Para filtrar el usuario con el id mas alto
    Optional <Order> findTopByOrderByIdDesc();
    
}
