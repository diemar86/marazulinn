<?php

use Drupal\node\Entity\Node;

/////////////////////////////
// HABITACIONES DE EJEMPLO
/////////////////////////////

$habitaciones = [
  [
    'title' => 'Habitación Sencilla',
    'capacidad' => 1,
    'precio_desde' => '150000',
    'desc' => 'Ideal para viajeros individuales que buscan tranquilidad y comodidad cerca de la playa.',
  ],
  [
    'title' => 'Habitación Doble',
    'capacidad' => 2,
    'precio_desde' => '220000',
    'desc' => 'Perfecta para parejas o amigos, con ambiente acogedor y aire acondicionado.',
  ],
  [
    'title' => 'Habitación Triple Familiar',
    'capacidad' => 3,
    'precio_desde' => '280000',
    'desc' => 'Pensada para familias pequeñas que desean estar cerca del mar en un entorno tranquilo.',
  ],
  [
    'title' => 'Habitación Cuádruple',
    'capacidad' => 4,
    'precio_desde' => '340000',
    'desc' => 'Habitación amplia para familias o grupos, con todas las comodidades básicas.',
  ],
];

foreach ($habitaciones as $data) {
  $node = Node::create([
    'type' => 'habitacion',
    'title' => $data['title'],
    'status' => 1,
    'langcode' => 'es',
    'field_capacidad' => $data['capacidad'],
    'field_precio_desde' => $data['precio_desde'],
    'field_descripcion_corta' => $data['desc'],
    // Si tienes más campos, agrégalos aquí
  ]);
  $node->save();
  print "Creada habitación: {$data['title']}\n";
}

/////////////////////////////
// PLANES TURÍSTICOS DE EJEMPLO
/////////////////////////////

$planes = [
  [
    'title' => 'Playa Blanca',
    'tipo' => 'playa',
    'duracion' => 'Día completo',
    'desde' => 'Salida desde el hotel Mar Azul Inn en la mañana.',
    'body' => 'Visita guiada a Playa Blanca con tiempo libre para disfrutar del mar, arenas blancas y actividades opcionales.',
  ],
  [
    'title' => 'Bahía Concha',
    'tipo' => 'playa',
    'duracion' => 'Día completo',
    'desde' => 'Salida desde el hotel, con transporte incluido hasta el parque.',
    'body' => 'Uno de los lugares más tranquilos del Parque Tayrona, ideal para relajarse en aguas cristalinas.',
  ],
  [
    'title' => 'Minca y Pozo Azul',
    'tipo' => 'naturaleza',
    'duracion' => 'Día completo',
    'desde' => 'Salida desde el hotel rumbo a la Sierra Nevada.',
    'body' => 'Recorrido por Minca, visita a cascadas y pozos de agua fría, perfecto para amantes de la naturaleza.',
  ],
];

foreach ($planes as $data) {
  $node = Node::create([
    'type' => 'plan_turistico',
    'title' => $data['title'],
    'status' => 1,
    'langcode' => 'es',
    'body' => [
      'value' => $data['body'],
      'format' => 'basic_html',
    ],
    'field_tipo_plan' => $data['tipo'],
    'field_duracion' => $data['duracion'],
    'field_desde' => $data['desde'],
    // Si tienes cta_url o cta_text, los puedes rellenar aquí
  ]);
  $node->save();
  print "Creado plan turístico: {$data['title']}\n";
}

print "==== CONTENIDO DEMO DE MAR AZUL CREADO ====\n";
