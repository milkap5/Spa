class Persona {
    static #count=23541;
    #id;
    #nombre;
    #apellido;
    #dni;
    #correo;
    #celular;
    #contrasenia;

    constructor(nombre, apellido, dni, correo, celular, contrasenia) {
        this.#id=Persona.#count++;
        this.#nombre=nombre;
        this.#apellido=apellido;
        this.#dni=dni;
        this.#correo=correo;
        this.#celular=celular;
        this.#contrasenia=contrasenia;
    }

    getNumeroCliente() { return this.#id;}

    getNombre() { return this.#nombre;}
    setNombre(nombre) { this.#nombre=nombre;}

    getApellido() { return this.#apellido;}
    setApellido(apellido) { this.#apellido=apellido;}

    getDni() { return this.#dni;}

    getCelular() { return this.#celular;}
    setCelular(celular) { this.#celular=celular;}

    getCorreo() { return this.#correo;}
    setCorreo(correo) { this.#correo=correo;}

    setContrasenia(contrasenia) { this.#contrasenia=contrasenia;}  
}

let clientes=Array();
clientes.push(new Persona('Gemma','ARIAS','35481779',3624124569,'gemma_arias@gmail.com', '45815'));
clientes.push(new Persona('Irene','OLIVA','35481781',3624124574,'irene_oliva@gmail.com', '45818'));
clientes.push(new Persona('Ramona','SUAREZ','35481783',3624124579,'ramona_suarez@gmail.com', '45821'));
clientes.push(new Persona('Vicenta','BASUALDO','35481785',3624124584,'vicenta_basualdo@gmail.com', '45824'));
clientes.push(new Persona('Angeles','OVIEDO','35481787',3624124589,'angeles_oviedo@gmail.com', '45827'));
clientes.push(new Persona('Bruno','PEREYRA','35481789',3624124594,'bruno_pereyra@gmail.com', '45830'));
clientes.push(new Persona('Liduvina','MACHADO','35481791',3624124599,'liduvina_machado@gmail.com', '45833'));
clientes.push(new Persona('Bautista','ROMERO','35481793',3624124604,'bautista_romero@gmail.com', '45836'));
clientes.push(new Persona('Dorotea','CEPEDA','35481795',3624124609,'dorotea_cepeda@gmail.com', '45839'));
clientes.push(new Persona('Fatima','IBARRA','35481797',3624124614,'fatima_ibarra@gmail.com', '45842'));
clientes.push(new Persona('Gonzalo','SANCHEZ','35481799',3624124619,'gonzalo_sanchez@gmail.com', '45845'));
clientes.push(new Persona('Ramon','CASTILLO','35481801',3624124624,'ramon_castillo@gmail.com', '45848'));
clientes.push(new Persona('Candido','RODRIGUEZ','35481803',3624124629,'candido_rodriguez@gmail.com', '45851'));
clientes.push(new Persona('Ignacio','PERALTA','35481805',3624124634,'ignacio_peralta@gmail.com', '45854'));
clientes.push(new Persona('Isidoro','SOSA','35481807',3624124639,'isidoro_sosa@gmail.com', '45857'));
clientes.push(new Persona('Rodrigo','ALMADA','35481809',3624124644,'rodrigo_almada@gmail.com', '45860'));
clientes.push(new Persona('Tomas','AGUILAR','35481811',3624124649,'tomas_aguilar@gmail.com', '45863'));
clientes.push(new Persona('Ynes','FUNES','35481813',3624124654,'ynes_funes@gmail.com', '45866'));
clientes.push(new Persona('Claudia','OLIVERA','35481815',3624124659,'claudia_olivera@gmail.com', '45869'));
clientes.push(new Persona('Gaspar','BLANCO','35481817',3624124664,'gaspar_blanco@gmail.com', '45872'));
clientes.push(new Persona('Hilaria','GONZALEZ','35481819',3624124669,'hilaria_gonzalez@gmail.com', '45875'));
clientes.push(new Persona('Justa','RAMIREZ','35481821',3624124674,'justa_ramirez@gmail.com', '45878'));
clientes.push(new Persona('Petronila','MORENO','35481823',3624124679,'petronila_moreno@gmail.com', '45881'));
clientes.push(new Persona('Ambrosio','MOYANO','35481825',3624124684,'ambrosio_moyano@gmail.com', '45884'));
clientes.push(new Persona('Bernardino','SILVA','35481827',3624124689,'bernardino_silva@gmail.com', '45887'));
clientes.push(new Persona('Encarnacion','DELGADO','35481829',3624124694,'encarnacion_delgado@gmail.com', '45890'));
clientes.push(new Persona('Javier','RIOS','35481831',3624124699,'javier_rios@gmail.com', '45893'));
clientes.push(new Persona('Rebeca','CEBALLOS','35481833',3624124704,'rebeca_ceballos@gmail.com', '45896'));
clientes.push(new Persona('Thais','VERA','35481835',3624124709,'thais_vera@gmail.com', '45899'));
clientes.push(new Persona('Agapito','AGUIRRE','35481837',3624124714,'agapito_aguirre@gmail.com', '45902'));
clientes.push(new Persona('Jean','OJEDA','35481839',3624124719,'jean_ojeda@gmail.com', '45905'));
clientes.push(new Persona('Joaquin','PEREZ','35481841',3624124724,'joaquin_perez@gmail.com', '45908'));
clientes.push(new Persona('Salome','MANSILLA','35481843',3624124729,'salome_mansilla@gmail.com', '45911'));
clientes.push(new Persona('Salvio','TABORDA','35481845',3624124734,'salvio_taborda@gmail.com', '45914'));
clientes.push(new Persona('Damaso','FLORES','35481847',3624124739,'damaso_flores@gmail.com', '45917'));
clientes.push(new Persona('Luis','CASTRO','35481849',3624124744,'luis_castro@gmail.com', '45920'));
clientes.push(new Persona('Paulina','ECHENIQUE','35481851',3624124749,'paulina_echenique@gmail.com', '45923'));
clientes.push(new Persona('Bibiana','GARAY','35481853',3624124754,'bibiana_garay@gmail.com', '45926'));
clientes.push(new Persona('Cristobal','TORRES','35481855',3624124759,'cristobal_torres@gmail.com', '45929'));
clientes.push(new Persona('Francesca','MARTIN','35481857',3624124764,'francesca_martin@gmail.com', '45932'));
clientes.push(new Persona('Gabriela','CABRERA','35481859',3624124769,'gabriela_cabrera@gmail.com', '45935'));
clientes.push(new Persona('Joana','MENDOZA','35481861',3624124774,'joana_mendoza@gmail.com', '45938'));
clientes.push(new Persona('Casimiro','MORALES','35481863',3624124779,'casimiro_morales@gmail.com', '45941'));
clientes.push(new Persona('Ester','TOLEDO','35481865',3624124784,'ester_toledo@gmail.com', '45944'));
clientes.push(new Persona('Guadalupe','FAVRE','35481867',3624124789,'guadalupe_favre@gmail.com', '45947'));
clientes.push(new Persona('Melchora','LEDESMA','35481869',3624124794,'melchora_ledesma@gmail.com', '45950'));
clientes.push(new Persona('Amelia','ACOSTA','35481871',3624124799,'amelia_acosta@gmail.com', '45953'));
clientes.push(new Persona('Catalina','REYNOSO','35481873',3624124804,'catalina_reynoso@gmail.com', '45956'));
clientes.push(new Persona('Esperanza','QUIROGA','35481875',3624124809,'esperanza_quiroga@gmail.com', '45959'));
clientes.push(new Persona('Polonia','CASAS','35481877',3624124814,'polonia_casas@gmail.com', '45962'));
clientes.push(new Persona('Adela','PAZ','35481879',3624124819,'adela_paz@gmail.com', '45965'));
clientes.push(new Persona('Lazaro','PEREIRA','35481881',3624124824,'lazaro_pereira@gmail.com', '45968'));
clientes.push(new Persona('Ysabel','LOPEZ','35481883',3624124829,'ysabel_lopez@gmail.com', '45971'));
clientes.push(new Persona('Faustino','RAMOS','35481885',3624124834,'faustino_ramos@gmail.com', '45974'));
clientes.push(new Persona('Fermin','GUTIERREZ','35481887',3624124839,'fermin_gutierrez@gmail.com', '45977'));
clientes.push(new Persona('Fernando','MALDONADO','35481889',3624124844,'fernando_maldonado@gmail.com', '45980'));
clientes.push(new Persona('Thomas','MONTENEGRO','35481891',3624124849,'thomas_montenegro@gmail.com', '45983'));
clientes.push(new Persona('Agueda','MACIEL','35481893',3624124854,'agueda_maciel@gmail.com', '45986'));
clientes.push(new Persona('Alberto','PACHECO','35481895',3624124859,'alberto_pacheco@gmail.com', '45989'));
clientes.push(new Persona('Barbara','MELO','35481897',3624124864,'barbara_melo@gmail.com', '45992'));
clientes.push(new Persona('Carlos','HERRERA','35481899',3624124869,'carlos_herrera@gmail.com', '45995'));
clientes.push(new Persona('Estefania','NAVARRO','35481901',3624124874,'estefania_navarro@gmail.com', '45998'));
clientes.push(new Persona('Benet','LUCERO','35481903',3624124879,'benet_lucero@gmail.com', '46001'));
clientes.push(new Persona('Bonifacio','ORTIZ','35481905',3624124884,'bonifacio_ortiz@gmail.com', '46004'));
clientes.push(new Persona('Feliciana','PALACIOS','35481907',3624124889,'feliciana_palacios@gmail.com', '46007'));
clientes.push(new Persona('Jorge','GARCIA','35481909',3624124894,'jorge_garcia@gmail.com', '46010'));
clientes.push(new Persona('Marcelino','CABRAL','35481911',3624124899,'marcelino_cabral@gmail.com', '46013'));
clientes.push(new Persona('Santos','FERREIRA','35481913',3624124904,'santos_ferreira@gmail.com', '46016'));
clientes.push(new Persona('Candida','ZAPATA','35481915',3624124909,'candida_zapata@gmail.com', '46019'));
clientes.push(new Persona('Gregorio','FIGUEROA','35481917',3624124914,'gregorio_figueroa@gmail.com', '46022'));
clientes.push(new Persona('Adelaida','LESCANO','35481919',3624124919,'adelaida_lescano@gmail.com', '46025'));
clientes.push(new Persona('Bonaventura','MARTINEZ','35481921',3624124924,'bonaventura_martinez@gmail.com', '46028'));
clientes.push(new Persona('Esteva','FERREYRA','35481923',3624124929,'esteva_ferreyra@gmail.com', '46031'));
clientes.push(new Persona('Eusebio','ROJAS','35481925',3624124934,'eusebio_rojas@gmail.com', '46034'));
clientes.push(new Persona('Marianna','DIAZ','35481927',3624124939,'marianna_diaz@gmail.com', '46037'));
clientes.push(new Persona('Apolonia','BURGOS','35481929',3624124944,'apolonia_burgos@gmail.com', '46040'));
clientes.push(new Persona('Elvira','RUIZ','35481931',3624124949,'elvira_ruiz@gmail.com', '46043'));
clientes.push(new Persona('Gregoria','OLMOS','35481933',3624124954,'gregoria_olmos@gmail.com', '46046'));
clientes.push(new Persona('Maria','GOMEZ','35481935',3624124959,'maria_gomez@gmail.com', '46049'));
clientes.push(new Persona('Mauricio','ALVAREZ','35481937',3624124964,'mauricio_alvarez@gmail.com', '46052'));
clientes.push(new Persona('Patricio','BARRIONUEVO','35481939',3624124969,'patricio_barrionuevo@gmail.com', '46055'));
clientes.push(new Persona('Visitacion','FERNANDEZ','35481941',3624124974,'visitacion_fernandez@gmail.com', '46058'));
clientes.push(new Persona('Anastasia','GODOY','35481943',3624124979,'anastasia_godoy@gmail.com', '46061'));
clientes.push(new Persona('Aniceto','DOMINGUEZ','35481945',3624124984,'aniceto_dominguez@gmail.com', '46064'));
clientes.push(new Persona('Isavel','BUSTOS','35481947',3624124989,'isavel_bustos@gmail.com', '46067'));
clientes.push(new Persona('Lorenza','DE ROMA','35481949',3624124994,'lorenza_de roma@gmail.com', '46070'));
clientes.push(new Persona('Julian','ROSSI','35481951',3624124999,'julian_rossi@gmail.com', '46073'));
clientes.push(new Persona('Saturnino','VEGA','35481953',3624125004,'saturnino_vega@gmail.com', '46076'));
clientes.push(new Persona('Benita','CORREA','35481955',3624125009,'benita_correa@gmail.com', '46079'));
clientes.push(new Persona('Cecilia','LUNA','35481957',3624125014,'cecilia_luna@gmail.com', '46082'));
clientes.push(new Persona('Ignacia','MOLINA','35481959',3624125019,'ignacia_molina@gmail.com', '46085'));
clientes.push(new Persona('Soledad','RAMALLO','35481961',3624125024,'soledad_ramallo@gmail.com', '46088'));
clientes.push(new Persona('Christobal','VALLEJOS','35481963',3624125029,'christobal_vallejos@gmail.com', '46091'));
clientes.push(new Persona('Claudio','GIGENA','35481965',3624125034,'claudio_gigena@gmail.com', '46094'));
clientes.push(new Persona('Elena','PONCE','35481967',3624125039,'elena_ponce@gmail.com', '46097'));
clientes.push(new Persona('Eva','MEDINA','35481969',3624125044,'eva_medina@gmail.com', '46100'));
clientes.push(new Persona('Geronima','OCAMPO','35481971',3624125049,'geronima_ocampo@gmail.com', '46103'));
clientes.push(new Persona('Pasquala','CACERES','35481973',3624125054,'pasquala_caceres@gmail.com', '46106'));
clientes.push(new Persona('Presentacion','CARRANZA','35481975',3624125059,'presentacion_carranza@gmail.com', '46109'));
clientes.push(new Persona('Rosalia','LOPEZ','35481977',3624125064,'rosalia_lopez@gmail.com', '46112'));
clientes.push(new Persona('Teresa','RAMOS','35481979',3624125069,'teresa_ramos@gmail.com', '46115'));
clientes.push(new Persona('Vigilia','GUTIERREZ','35481981',3624125074,'vigilia_gutierrez@gmail.com', '46118'));
clientes.push(new Persona('Andrea','MALDONADO','35481983',3624125079,'andrea_maldonado@gmail.com', '46121'));
clientes.push(new Persona('Elias','MONTENEGRO','35481985',3624125084,'elias_montenegro@gmail.com', '46124'));
clientes.push(new Persona('Rufina','MACIEL','35481987',3624125089,'rufina_maciel@gmail.com', '46127'));
clientes.push(new Persona('Sancho','PACHECO','35481989',3624125094,'sancho_pacheco@gmail.com', '46130'));
clientes.push(new Persona('Teofila','MELO','35481991',3624125099,'teofila_melo@gmail.com', '46133'));
clientes.push(new Persona('Clemente','HERRERA','35481993',3624125104,'clemente_herrera@gmail.com', '46136'));
clientes.push(new Persona('Ysavel','NAVARRO','35481995',3624125109,'ysavel_navarro@gmail.com', '46139'));
clientes.push(new Persona('Alonso','LUCERO','35481997',3624125114,'alonso_lucero@gmail.com', '46142'));
clientes.push(new Persona('Catelina','ORTIZ','35481999',3624125119,'catelina_ortiz@gmail.com', '46145'));
clientes.push(new Persona('Josepha','PALACIOS','35482001',3624125124,'josepha_palacios@gmail.com', '46148'));
clientes.push(new Persona('Leandro','GARCIA','35482003',3624125129,'leandro_garcia@gmail.com', '46151'));
clientes.push(new Persona('Miquel','CORREA','35482005',3624125134,'miquel_correa@gmail.com', '46154'));
clientes.push(new Persona('Nicolasa','LUNA','35482007',3624125139,'nicolasa_luna@gmail.com', '46157'));
clientes.push(new Persona('Pasqual','MOLINA','35482009',3624125144,'pasqual_molina@gmail.com', '46160'));

class Servicio {
    #tipo;
    #servicio;
    #precio;

    constructor(tipo, servicio, precio) {
        this.#tipo=tipo;
        this.#servicio=servicio;
        this.#precio=precio;
    }

    getTipoServicio() { return this.#tipo;}
    getServicio() { return this.#servicio;}
    setServicio(servicio) {

    }
}

const Grupales = {
    'Hidromasajes': 8000,
    'Yoga': 6000
}

const Individuales = {
    'Masaje Anti-Stress': 10000,
    'Masaje descontracturante': 12000,
    'Masaje con piedras calientes': 16000,
    'Masaje circulatorio': 14500,
    'Lifting de pestañas': 25000,
    'Depilación facial': 17000,
    'Belleza de manos y pies': 21000,
    'Punta de Diamante (Microexfoliación)': 20000,
    'Limpieza profunda + Hidratación': 18000,
    'Criofrecuencia facial': 22000,
    'VelaSlim': 35000,
    'DermoHealth': 36000,
    'Criofrecuencia corporal': 29000,
    'Ultracabitacion': 28000
}

class Turnos {
    static #count=2445;
    #id;
    #dniCliente;
    #mailCliente;
    #servicio;
    #fecha;
    #hora;

    constructor(dni, mail, servicio, fecha, hora) {
        this.#id=Turnos.#count++;
        this.#dniCliente=dni;
        this.#mailCliente=clientes;
        this.#servicio=servicio;
        this.#fecha=fecha;
        this.#hora=hora;
    }
}