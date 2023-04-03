#!/bin/bash
echo "Console monitor SEFAZ"
echo "Versão 1.0.12 do console"
while true; do
    read -p "monitor~sefaz:$ " cmd
    case $cmd in
        sefaz-start)
            nohup node sefaz.js >> sefaz.log 2>&1 &
            echo "monitor iniciado"
            ;;
        sefaz-status)
            ps aux | grep "node sefaz"
            ;;
        sefaz-monitor)
            tail -f sefaz.log
            ;;
        config)
            vi ./config/config.js
            ;;
        sefaz-stop)
            read -p "Passe o pid do processo:" id
            kill $id;
            echo "sefaz killed"
            ;;
        get-version)
            echo "0.1.12v - versão do monitor"
            ;;
        exit)
            break
            ;;
        *)
            $cmd
            ;;
    esac
done

echo "Saindo do console"
