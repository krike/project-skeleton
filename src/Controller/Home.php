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
        $homeModel = new HomeModel();
        $homeModel->getById(1);
        echo $this->twig->render('home/index.html.twig', $this->viewData);
    }
    
}