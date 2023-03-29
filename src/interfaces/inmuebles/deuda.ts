export interface Deuda {
    mensaje:           string;
    datosPadron:       DatosPadron;
    cuotas:            Cuota[];
    pagoElectronico:   number;
    totalCuotasPlan:   number;
    totalCuotasJuicio: number;
    totalCuotas:       number;
}

export interface Cuota {
    tasa:        string;
    n_cuenta:    number;
    cuota:       string;
    obra:        number;
    fecha_pago:  Date | null;
    fecha_ven1:  Date;
    importe:     number;
    estado:      string;
    luz:         number;
    estaDeta:    EstaDeta;
    convenio:    number | null;
    estadonew:   Estadonew | null;
    fechaCertil: null;
    t_interes:   string;
    cunica:      string;
    anio:        string;
    pagable:     boolean | number;
    descuento:   number;
    recargo:     number;
    totalcuota:  number;
}

export enum EstaDeta {
    Impago = "Impago",
}

export enum Estadonew {
    R = "R ",
    T = "T",
}

export interface DatosPadron {
    cum:           string;
    part_prov:     number;
    cuenta:        number;
    d_vefi:        number;
    responcum:     string;
    respondispo:   string;
    nom_titu:      string;
    di_calle:      string;
    di_nro:        number;
    di_piso:       string;
    di_dpto:       string;
    di_entre:      string;
    di_nlocal:     number;
    nro_desde:     number;
    nro_hasta:     number;
    nro_asig:      string;
    nro_reser:     string;
    zona:          string;
    barrio:        number;
    nc_circ:       string;
    nc_sec:        string;
    nc_mzna:       string;
    nc_letmzna:    string;
    nc_parc:       string;
    nc_letparc:    string;
    nc_uf:         string;
    nc_chacra:     string;
    nc_lchacra:    string;
    nc_quinta:     string;
    nc_fracci:     string;
    n_c_serv:      string;
    condicion:     string;
    camtitu:       string;
    superficie:    number;
    valuacion:     number;
    categoria:     string;
    destino:       string;
    c_serv:        string;
    categ:         string;
    mts_fte:       number;
    emite:         string;
    banco:         string;
    tipo_cta:      number;
    nro_cta:       string;
    lockeado:      string;
    docu:          string;
    edea:          string;
    observa:       string;
    subarea:       string;
    liqfiscal:     number;
    luz:           number;
    gas:           number;
    agua:          number;
    cloacas:       number;
    sup_cub:       string;
    sup_secu:      string;
    sup_libr:      string;
    sup_terr:      string;
    valu_terr:     number;
    valu_edif:     number;
    valumuni:      number;
    baseimpo:      number;
    frente:        string;
    contrafrente:  string;
    ladoi:         string;
    ladod:         string;
    ochava:        string;
    anchocalle:    string;
    insdominio:    string;
    codbanco:      number;
    cbu:           string;
    tipo_debi:     number;
    tipo_cuot:     number;
    pagoele:       Date;
    bajaele:       null;
    tarjemite:     number;
    tarjevence:    number;
    debsoloplan:   number;
    medidornro:    string;
    medidorzona:   string;
    numcarpobra:   number;
    aniocarpobra:  number;
    pos_calle:     string;
    pos_nro:       number;
    pos_piso:      string;
    pos_dpto:      string;
    pos_cp:        number;
    pos_localidad: string;
    pos_pcia:      string;
    comercio:      number;
    mojonnro:      number;
    mojonfecha:    null;
    profesional:   string;
    mtcubierto:    number;
    mtsemicub:     number;
    tipoobra:      number;
    tablaref:      number;
    femision:      Date;
    fvisado:       Date;
    pileta:        number;
    saliente:      number;
    balcones:      number;
    subsuelo:      number;
    valufiscal:    number;
    mtsconstru:    number;
    mtslote:       number;
    obralegajo:    string;
    obraexpedi:    string;
    obraaprobada:  Date;
    obradestino:   string;
    baseimponible: number;
    viviendas:     number;
    locales:       number;
    galpones:      number;
    cocheras:      number;
    habhotel:      number;
    habapart:      number;
    plantas:       number;
    cantiotro:     number;
    reciboelec:    Date;
    ctactedes:     Date;
    reunida:       number;
    reunidatex:    string;
    abiertaoficio: number;
    croquis:       string;
    catDeta:       string;
    destDeta:      string;
    servDeta:      string;
    condiDeta:     string;
    apliMyru:      string;
}