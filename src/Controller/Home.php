<?php

namespace Krikke\Skeleton\Controller;
use Krikke\Skeleton\Controller\AbstractController;

class Home extends AbstractController {

    public function __construct() {
        parent::__construct();
    }

    public function index()
    {
        echo $this->twig->render('home/index.html.twig', $this->viewData);
    }
    
}