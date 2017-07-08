<?php

namespace Firebase;

//require_once __DIR__ . "/src/firebaseLib.php";
require './vendor/ktamas77/firebase-php/src/firebaseLib.php';


use Exception;

// --- set up your own database here
//const DEFAULT_URL = 'https://blueberry-ff511.firebaseio.com/';
//const DEFAULT_TOKEN = 'VbX7hQIY9E8Zqa8Y96cktQl34M0oXcRDSawLXkDf';
const DEFAULT_URL = 'https://dine-around-test.firebaseapp.com/';
const DEFAULT_TOKEN = 'AIzaSyCv3_4XVnX-UKz_ZHqteC_2xHlHKSDG-Cc';

$firebase = new FirebaseLib(DEFAULT_URL, DEFAULT_TOKEN);

//if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {//    
//} else {
//
//    
  
    $req = json_decode(file_get_contents('php://input'), true);
    $data = $firebase->get('/feedback_user');
    $data = json_decode(json_encode((array) json_decode($data)), true);
    
    $customers = array();

    foreach ($data as $key => $value) {
        
        $birthdate = gmdate("Y-m-d", $value['birth_date']/1000);
        $anniversarydate = gmdate("Y-m-d", $value['anniversary_date']/1000);
        $mobile=$value['mobile_no'];
        
        array_push($customers, array("birthdate" => $birthdate, "AnniversaryDate" => $anniversarydate,"Mobile"=>$mobile));
    }
    
    if (count($customers) > 0) {
//        $customers = call_user_func_array('array_merge', $customers);
//        $customers = array_unique($customers);
        
//        $phones = [918866856039];

        include("./includeSettings.php");
        $req = json_decode(file_get_contents('php://input'), true);
        foreach($customers as $cust){
            $now = date("Y-m-d"); // or your date as well
            $birthdate = $cust['birthdate'];
            $date1 = new \DateTime($now);
            $date2 = new \DateTime($birthdate);
            $date3 = new \DateTime($cust['AnniversaryDate']);
            $diff = $date2->diff($date1)->format("%a");
            $diff1 = $date3->diff($date1)->format("%a");
            if($diff == 0) {
                $userAccount = 966531378656;
                $passAccount = 15987;
                $msg = "Happy birthday..";
                $sender = "BlueBerry";
                $numbers = $cust['Mobile'];
                
                $MsgID = rand(1, 99999);
                $timeSend = 0;
                $dateSend = 0;
                $deleteKey = 152485;
                $resultType = 1;
                
                echo sendSMS($userAccount, $passAccount, $numbers, $sender, $msg, $MsgID, $timeSend, $dateSend, $deleteKey, $resultType); 
            }
            
            if($diff1 == 0) {
                $userAccount = 966531378656;
                $passAccount = 15987;
                $msg = "Happy wedding anniversary..";
                $sender = "BlueBerry";
                $numbers = $cust['Mobile'];
                $MsgID = rand(1, 99999);
                $timeSend = 0;
                $dateSend = 0;
                $deleteKey = 152485;
                $resultType = 1;
                //$result="";
                echo sendSMS($userAccount, $passAccount, $numbers, $sender, $msg, $MsgID, $timeSend, $dateSend, $deleteKey, $resultType); 
            }
        }
        
    } 
//}









