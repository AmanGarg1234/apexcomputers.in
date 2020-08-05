<?php
	$name = $_POST['name'];
	$college_company = $_POST['college_company'];
	$feedback_message = $_POST['feedback_message'];
	$photo = $_POST['photo'];
	
	$conn = new mysqli('localhost','root','','test');
	if($conn->connect_error){
		die('Connection failed : '.$conn->connect_error);
	}else{
		$stmt = $conn->prepare("insert into registration(name,college_company,feedback_message,photo)
			values(?,?,?,?)");
		$stmt->bind_param("ssss",$name,$college_company,$feedback_message,$photo);
		$stmt->execute();
		echo"registration successfully";
		$stmt->close();
		$stmt->close();
	}
?>
	