<?php

namespace Krikke\Skeleton\Controller;
use Krikke\Skeleton\Controller\AbstractController;
use Krikke\Skeleton\Models\ExampleModel;

class Example extends AbstractController {

    public function __construct() {
        parent::__construct();
    }

    public function index()
    {
        $exampleModel = new ExampleModel();
        $item = $exampleModel->getById(2);
        $items = $exampleModel->getAllItems();
        //echo 'item: '; print_r($item); echo '<br /><br />';
        //echo 'items: '; print_r($items); echo '<br />';
        echo $this->twig->render('example/index.html.twig', $this->viewData);
    }
    
}