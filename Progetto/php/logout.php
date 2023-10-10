<?php declare(strict_types=1);
function logout()
{   
    session_start();
    if (isset($_SESSION['username'])) {
        session_start();
        session_regenerate_id();
        session_destroy();
        header("Location:../html/login.php");
    }
    else
        header("Location:../html/login.php");
}

logout();
?>