<?php
        header("Access-Control-Allow-Origin: *");
        
        
        include('connectDB.php');

        $sql = "SELECT * FROM test_tbl ";
        $result = mysqli_query($con,$sql);

        $arr = array();
        while($row = mysqli_fetch_assoc($result)){
            $arr[] = $row;
        }
            mysqli_close($con);
            echo json_encode($arr);

?>