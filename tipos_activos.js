const activosMap = {
    "Datos / Información": {
        prefijoTipo: "D",
        activos: {
            conf: "Archivos de configuración",
            files: "Ficheros",
            backup: "Copias de respaldo",
            int: "Datos de gestión interna",
            password: "Credenciales",
            auth: "Datos de validación de credenciales",
            acl: "Datos de control de acceso",
            log: "Registro de actividad",
            source: "Código fuente",
            exe: "Código ejecutable",
            test: "Datos de prueba"
        }
    },
    "Activos esenciales": {
        prefijoTipo: "essential",
        activos: {
            info: "Información",
            adm: "Datos de interés para la administración pública",
            vr: "Datos vitales (registros de la organización)",
            per: "Datos de carácter personal",
            A: "Nivel alto",
            M: "Nivel medio",
            B: "Nivel bajo",
            classified: "Datos clasificados",
            C: "Nivel confidencial",
            R: "Difusión limitada",
            UC: "Sin clasificar",
            pub: "De carácter público",
            service: "Servicio"
        }
    },
    "Claves criptográficas": {
        prefijoTipo: "keys",
        activos: {
            info: "Protección de la información",
            encrypt: "Claves de cifra",
            shared_secret: "Secreto compartido (clave simétrica)",
            public_encryption: "Clave pública de cifra",
            public_decryption: "Clave privada de descifrado",
            sign: "Claves de firma",
            public_signature: "Clave privada de firma",
            public_verification: "Clave pública de verificación de firma",
            com: "Protección de las comunicaciones",
            channel: "Claves de cifrado del canal",
            authentication: "Claves de autenticación",
            verification: "Claves de verificación de autenticación",
            disk: "Cifrado de soportes de información",
            x509: "Certificados de clave pública"
        }
    },
    "Servicios": {
        prefijoTipo: "S",
        activos: {
            anon: "Anónimo (sin requerir identificación del usuario)",
            pub: "Al público en general (sin relación contractual)",
            ext: "A usuarios externos (bajo una relación contractual)",
            int: "Interno (a usuarios de la propia organización)",
            www: "World Wide Web",
            telnet: "Acceso remoto a cuenta local",
            email: "Correo electrónico",
            file: "Almacenamiento de ficheros",
            ftp: "Transferencia de ficheros",
            edi: "Intercambio electrónico de datos",
            dir: "Servicio de directorio",
            idm: "Gestión de identidades",
            ipm: "Gestión de privilegios",
            pki: "PKI - Infraestructura de clave pública"
        }
    },
    "Arquitectura del sistema": {
        prefijoTipo: "arch",
        activos: {
            sap: "Punto de acceso al servicio",
            ip: "Punto de interconexión",
            ext: "Proporcionado por terceros"
        }
    },
    "Aplicaciones (software)": {
        prefijoTipo: "SW",
        activos: {
            prp: "Desarrollo propio (in house)",
            sub: "Desarrollo a medida (subcontratado)",
            std: "Estándar (off the shelf)",
            browser: "Navegador web",
            www: "Servidor de presentación",
            app: "Servidor de aplicaciones",
            email_client: "Cliente de correo electrónico",
            email_server: "Servidor de correo electrónico",
            file: "Servidor de ficheros",
            dbms: "Sistema de gestión de bases de datos",
            tm: "Monitor transaccional",
            office: "Ofimática",
            av: "Anti virus",
            os: "Sistema operativo",
            hypervisor: "Gestor de máquinas virtuales",
            ts: "Servidor de terminales",
            backup: "Sistema de backup"
        }
    },
    "Equipos informáticos (hardware)": {
        prefijoTipo: "HW",
        activos: {
            host: "Grandes equipos",
            mid: "Equipos medios",
            pc: "Informática personal",
            mobile: "Informática móvil",
            pda: "Agendas electrónicas",
            vhost: "Equipo virtual",
            backup: "Equipamiento de respaldo",
            peripheral: "Periféricos",
            print: "Medios de impresión",
            scan: "Escáneres",
            crypto: "Dispositivos criptográficos",
            bp: "Dispositivo de frontera",
            network: "Soporte de la red",
            modem: "Módems",
            hub: "Concentradores",
            switch: "Conmutadores",
            router: "Encaminadores",
            bridge: "Pasarelas",
            firewall: "Cortafuegos",
            wap: "Punto de acceso inalámbrico",
            pabx: "Centralita telefónica",
            ipphone: "Teléfono IP"
        }
    },
    "Redes de comunicaciones": {
        prefijoTipo: "COM",
        activos: {
            PSTN: "Red telefónica",
            ISDN: "RDSI (red digital)",
            X25: "X25 (red de datos)",
            ADSL: "ADSL",
            pp: "Punto a punto",
            radio: "Comunicaciones radio",
            wifi: "Red inalámbrica",
            mobile: "Telefonía móvil",
            sat: "Por satélite",
            LAN: "Red local",
            MAN: "Red metropolitana",
            Internet: "Internet"
        }
    },
    "Soportes de información": {
        prefijoTipo: "Media",
        activos: {
            electronic: "Electrónicos",
            disk: "Discos",
            vdisk: "Discos virtuales",
            san: "Almacenamiento en red",
            disquette: "Disquetes",
            cd: "Cederrón (CD-ROM)",
            usb: "Memorias USB",
            dvd: "DVD",
            tape: "Cinta magnética",
            mc: "Tarjetas de memoria",
            ic: "Tarjetas inteligentes",
            non_electronic: "No electrónicos",
            printed: "Material impreso",
            tape_paper: "Cinta de papel",
            film: "Microfilm",
            cards: "Tarjetas perforadas"
        }
    },
    "Equipamiento auxiliar": {
        prefijoTipo: "AUX",
        activos: {
            power: "Fuentes de alimentación",
            ups: "Sistemas de alimentación ininterrumpida",
            gen: "Generadores eléctricos",
            ac: "Equipos de climatización",
            cabling: "Cableado",
            wire: "Cable eléctrico",
            fiber: "Fibra óptica",
            robot: "Robots",
            tape: "Robots de cintas",
            disk: "Robots de discos",
            supply: "Suministros esenciales",
            destroy: "Equipos de destrucción de soportes de información",
            furniture: "Mobiliario: armarios, etc.",
            safe: "Cajas fuertes"
        }
    },
    "Instalaciones": {
        prefijoTipo: "L",
        activos: {
            site: "Recinto",
            building: "Edificio",
            local: "Cuarto",
            mobile: "Plataformas móviles",
            car: "Vehículo terrestre: coche, camión, etc.",
            plane: "Vehículo aéreo: avión, etc.",
            ship: "Vehículo marítimo: buque, lancha, etc.",
            shelter: "Contenedores",
            channel: "Canalización",
            backup: "Instalaciones de respaldo"
        }
    },
    "Personal": {
        prefijoTipo: "P",
        activos: {
            ue: "Usuarios externos",
            ui: "Usuarios internos",
            op: "Operadores",
            adm: "Administradores de sistemas",
            com: "Administradores de comunicaciones",
            dba: "Administradores de BBDD",
            sec: "Administradores de seguridad",
            des: "Desarrolladores / programadores",
            sub: "Subcontratas",
            prov: "Proveedores"
        }
    }
};