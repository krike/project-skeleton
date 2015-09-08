<?php

namespace Krikke\Skeleton\Controller;

abstract class AbstractController {
    
    public $twigLoader;
    public $twig;
    public $viewData = array();
    
    public function __construct()
    {
        $this->twigLoader = new \Twig_Loader_Filesystem('views');
        $this->twig = new \Twig_Environment($this->twigLoader);
        include_once BASE_DIR . '/lib/twig/functions.php';
        $this->viewData['base_dir'] = BASE_DIR;
        $this->viewData['base_url'] = BASE_URL;
    }

    /**
	* Function to respond with json header. Usefull for ajax calls
	* @param type $response 
	*/
	public function jsonResponseOutput($response) {
		header("Content-Type: application/json");
		echo json_encode($response);
		exit;
	}
    
    public function extractJsonFromPost()
    {
        $input_data = trim(file_get_contents('php://input'));
        return (array) json_decode($input_data);
    }
    
}