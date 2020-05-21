<?php

	$t = $_GET['type'];

	header('Content-Type: text/plain; charset=utf-8');

	// $data = file_get_contents('php://input');

	$npath = '../db-images/marvel-cards';
			   if(!is_dir($npath)) {
				   //Directory does not exist, so lets create it.
				   mkdir($npath, 0777);
				} 

			   $filename1 = $_FILES['file0']['name'];
			   $filename2 = $_FILES['file1']['name'];
				
				// $destination1 = $npath .'/' . $filename1;
				// $destination2 = $npath .'/' . $filename2;

				move_uploaded_file( $_FILES['file0']['tmp_name'] , $npath .'/' . $filename1 );
				move_uploaded_file( $_FILES['file1']['tmp_name'] , $npath .'/' . $filename2 );

?>