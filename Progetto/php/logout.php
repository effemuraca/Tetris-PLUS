<?php declare(strict_types=1);
function logout()
{   
    session_start();
    if (isset($_SESSION['username'])) {
        session_start();
        session_regenerate_id();
        session_destroy();
        header("Location:../html/login.html");
    }
    else
        header("Location:../html/login.html");
}

logout();
?>