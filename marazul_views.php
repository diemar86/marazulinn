<?php

use Drupal\views\Entity\View;

/////////////////////////////
// VIEW: HABITACIONES
/////////////////////////////

if (!View::load('habitaciones')) {
  $view = View::create([
    'id' => 'habitaciones',
    'label' => 'Habitaciones',
    'module' => 'views',
    'description' => 'Listado de habitaciones del hotel',
    'tag' => '',
    'base_table' => 'node_field_data',
    'base_field' => 'nid',
    'core' => '10.x',
    'status' => TRUE,
    'display' => [
      'default' => [
        'display_plugin' => 'default',
        'id' => 'default',
        'display_title' => 'Default',
        'position' => 0,
        'display_options' => [
          'access' => [
            'type' => 'perm',
            'options' => ['perm' => 'access content'],
          ],
          'query' => [
            'type' => 'views_query',
          ],
          'filters' => [
            'status' => [
              'id' => 'status',
              'table' => 'node_field_data',
              'field' => 'status',
              'value' => 1,
              'plugin_id' => 'boolean',
            ],
            'type' => [
              'id' => 'type',
              'table' => 'node_field_data',
              'field' => 'type',
              'value' => ['habitacion' => 'habitacion'],
              'plugin_id' => 'bundle',
            ],
          ],
          'pager' => [
            'type' => 'full',
            'options' => [
              'items_per_page' => 12,
            ],
          ],
          'style' => [
            'type' => 'grid',
            'options' => [
              'columns' => 3,
            ],
          ],
          'row' => [
            'type' => 'entity:node',
            'options' => [
              'view_mode' => 'teaser',
            ],
          ],
        ],
      ],
      'page_1' => [
        'display_plugin' => 'page',
        'id' => 'page_1',
        'display_title' => 'Página',
        'position' => 1,
        'display_options' => [
          'path' => 'habitaciones',
        ],
      ],
    ],
  ]);
  $view->save();
  print "View 'habitaciones' creada.\n";
}
else {
  print "View 'habitaciones' ya existe, no se ha modificado.\n";
}

/////////////////////////////
// VIEW: PLANES TURÍSTICOS
/////////////////////////////

if (!View::load('planes_turisticos')) {
  $view = View::create([
    'id' => 'planes_turisticos',
    'label' => 'Planes Turísticos',
    'module' => 'views',
    'description' => 'Listado de planes turísticos del hotel',
    'tag' => '',
    'base_table' => 'node_field_data',
    'base_field' => 'nid',
    'core' => '10.x',
    'status' => TRUE,
    'display' => [
      'default' => [
        'display_plugin' => 'default',
        'id' => 'default',
        'display_title' => 'Default',
        'position' => 0,
        'display_options' => [
          'access' => [
            'type' => 'perm',
            'options' => ['perm' => 'access content'],
          ],
          'query' => [
            'type' => 'views_query',
          ],
          'filters' => [
            'status' => [
              'id' => 'status',
              'table' => 'node_field_data',
              'field' => 'status',
              'value' => 1,
              'plugin_id' => 'boolean',
            ],
            'type' => [
              'id' => 'type',
              'table' => 'node_field_data',
              'field' => 'type',
              'value' => ['plan_turistico' => 'plan_turistico'],
              'plugin_id' => 'bundle',
            ],
          ],
          'pager' => [
            'type' => 'full',
            'options' => [
              'items_per_page' => 12,
            ],
          ],
          'style' => [
            'type' => 'grid',
            'options' => [
              'columns' => 3,
            ],
          ],
          'row' => [
            'type' => 'entity:node',
            'options' => [
              'view_mode' => 'teaser',
            ],
          ],
        ],
      ],
      'page_1' => [
        'display_plugin' => 'page',
        'id' => 'page_1',
        'display_title' => 'Página',
        'position' => 1,
        'display_options' => [
          'path' => 'turismo-planes',
        ],
      ],
    ],
  ]);
  $view->save();
  print "View 'planes_turisticos' creada.\n";
}
else {
  print "View 'planes_turisticos' ya existe, no se ha modificado.\n";
}

