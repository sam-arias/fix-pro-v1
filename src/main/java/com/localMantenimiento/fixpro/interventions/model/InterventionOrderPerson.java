package com.localMantenimiento.fixpro.interventions.model;

import com.localMantenimiento.fixpro.person.model.Person;
import jakarta.persistence.*;
import lombok.Data;

import java.io.Serializable;

@Data
@Entity
@Table(name = "intervention_order_person")
public class InterventionOrderPerson {
  @EmbeddedId
  private InterventionOrderPersonId id;

  @ManyToOne
  @MapsId("interventionOrderId")
  @JoinColumn(name = "intervention_order_id")
  private InterventionOrder interventionOrder;

  @ManyToOne
  @MapsId("personId")
  @JoinColumn(name = "person_id")
  private Person person;
}

@Embeddable
class InterventionOrderPersonId implements Serializable {
  private Long interventionOrderId;
  private Long personId;
}
