<?php declare(strict_types=1);
function logout()
{
    if (session_status() == PHP_SESSION_NONE)
        session_start();

    if (isset($_SESSION['username'])) {
        session_destroy();
        header("Location:../html/login.html");
    } 
    else
        header("Location:../html/login.html");
}

logout();
?>