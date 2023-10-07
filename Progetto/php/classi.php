<?php declare(strict_types=1);
class Partita
{
    private $id;
    private $username;
    private $punteggio;
    private $data;
    private $modalità;
    private $matrice;

    public function __construct(string $id, string $username, int $punteggio, DateTime $data, bool $modalità, string $matrice)
    {
        $this->id = $id;
        $this->username = $username;
        $this->punteggio = $punteggio;
        $this->data = $data;
        $this->modalità = $modalità;
        $this->matrice = $matrice;
    }

    public function getId()
    {
        return $this->id;
    }

    public function getUsername()
    {
        return $this->username;
    }

    public function getModalita()
    {
        return $this->modalità;
    }

    public function getPunteggio()
    {
        return $this->punteggio;
    }

    public function getData()
    {
        return $this->data;
    }

    public function setPunteggio(int $punteggio)
    {
        if ($punteggio > $this->punteggio || $this->punteggio == 0) {
            $this->punteggio = $punteggio;
        }
    }

    public function setData()
    {
        date_default_timezone_set('Europe/Rome');
        $data = date("d/m/Y");
        $this->data = $data;
    }

    public function toMatrix()
    {
        $matrice = array();
        for ($i = 0; $i < 20; $i++) {
            $matrice[$i] = array();
            for ($j = 0; $j < 10; $j++) {
                $matrice[$i][$j] = $this->matrice[$i * 10 + $j];
            }
        }
        return $matrice;
    }
}
?>