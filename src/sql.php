<?php
header("Content-Type: application/json; charset=UTF-8");
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
     
       require '../connfnc.php';
        
       // include('myapp.php');
        function mobile_sql(){
         $postdata = file_get_contents("php://input");
        if(isset($postdata)){
                $request = json_decode($postdata);
                $postData['email'] = $request->email;
                $postData['username']= $request->username;
                echo json_encode($postData);
                exit();


        }
    }
    mobile_sql();

       // $sql = "SELECT * FROM test_tbl ";
        //$result = mysqli_query($con,$sql);

       // $arr = array();
        //while($row = mysqli_fetch_assoc($result)){
           // $arr[] = $row;
        //}
         //   mysqli_close($con);
          //  echo json_encode($arr);

?>