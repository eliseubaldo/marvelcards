<?php
	include 'connection.php';

	$t = $_GET['type'];

	$data = file_get_contents('php://input');
	$obj = json_decode($data,true);

	$col_name = $obj['name'];

						//UPDATE table1 SET col_a='k1', col_b='foo' WHERE key_col='1';
	switch ($t) {
	    case "col":
	    	if($obj['collection_id']){
	        	$sql = "UPDATE collection SET collection_name='". $obj['collection_name'] . "' WHERE collection_id=" . $obj['collection_id'] ."";
			} else {
				$sql = "INSERT INTO collection (collection_id, collection_name) VALUES (NULL, '" .  $obj['name'] ."')";
			}


	        if ($conn->query($sql) === TRUE) {
			echo "New record created successfully";
			} else {
			echo "Error: " . $sql . "<br>" . $conn->error;
			}$conn->close();

	    	break;

	     case "cat":
	        $sql = "INSERT INTO category (category_id, category_name, category_year, collection_id) VALUES (NULL, '" . $obj['name'] ."', '" . $obj['year'] ."', '" . $obj['collection'] ."')";

	        if ($conn->query($sql) === TRUE) {
			echo "New record created successfully";
			} else {
			echo "Error: " . $sql . "<br>" . $conn->error;
			}$conn->close();

	    	break;

	    case "item":
	       	$filename = $_FILES['file']['name'];
	    	$item = $_POST['otherinfo'];
	    	$collname = $_POST['collName'];
	    	$collid = $_POST['collId'];

			$npath = '../uploads/'. $collname;
			if(!is_dir($npath)){
			    //Directory does not exist, so lets create it.
			    mkdir($npath, 0777);
			} 

			// Generate a unique file name
			$new_image_name = date('Y-m-d-s') . uniqid() . '-' . $filename;

			$destination = $npath .'/' . $new_image_name;
			move_uploaded_file( $_FILES['file']['tmp_name'] , $destination );

			$sql = "INSERT INTO item (item_id, collection_id, category_id, item_description, item_name, item_picture) VALUES (NULL, '" . $collid ."','" . $item['category'] ."', '" . $item['desc'] ."', '" . $item['name'] ."', '" . $new_image_name ."' )";

	        if ($conn->query($sql) === TRUE) {
			echo "New record created successfully";
			} else {
			echo "Error: " . $sql . "<br>" . $conn->error;
			}$conn->close();

	    	break;

	    
	}


?>