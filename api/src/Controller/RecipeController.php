<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\Routing\Annotation\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Serializer\Serializer;
use Symfony\Component\Serializer\Encoder\XmlEncoder;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use App\Entity\Recipe;

class RecipeController extends Controller
{
	/**
     * @Route("/api/recipes")
     * @Method("GET")
     */
    public function myRecipesAction() {
    	$repository = $this->getDoctrine()->getRepository(Recipe::class);
    	$recipes = $repository->findAll();

    	$encoders = array(new XmlEncoder(), new JsonEncoder());
		$normalizers = array(new ObjectNormalizer());
		$serializer = new Serializer($normalizers, $encoders);

		$json = $serializer->serialize($recipes, 'json');

    	return new Response($json);
    }
}