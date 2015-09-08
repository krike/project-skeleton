<?php

namespace Krikke\Skeleton\Controller;
use Krikke\Skeleton\Controller\AbstractController;
use Krikke\Skeleton\Models\HomeModel;

class Home extends AbstractController {

    public function __construct() {
        parent::__construct();
    }

    public function index()
    {
        $model = new HomeModel();
        /*$item = $model->getById(2);
        $items = $model->getAllItems();
        echo 'item: '; print_r($item); echo '<br /><br />';
        echo 'items: '; print_r($items); echo '<br />';*/
        echo $this->twig->render('home/index.html.twig', $this->viewData);
    }
    
}