<?php

class home extends Controller {

    public function __construct() {
        parent::__construct();
    }

    public function index()
    {
        echo $this->twig->render('home/index.html.twig', $this->viewData);
    }
    
}