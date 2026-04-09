---
title: "Due diligence técnica fintech: qué revela el código"
description: "Due diligence técnica fintech: madurez del código, integraciones ausentes y lock-in de proveedor antes de una adquisición. Descubra la lista de 8 puntos."
pubDate: 2021-07-10
lang: "es"
translationKey: "2021-07-10"
---

La demo funciona. La interfaz es limpia. Los fundadores recorren su dashboard en dos minutos. El backend responde. Las transacciones se procesan.

Y sin embargo, la tecnología no está lista para el despliegue comercial.

Para eso existe la due diligence técnica fintech. No para confirmar que algo funciona en una demo —sino para responder a una pregunta distinta: ¿puede esta tecnología operar **a escala, en un entorno regulado, con una base real de usuarios, en un mercado con restricciones de infraestructura?**

Esta pregunta surge con especial frecuencia en el sector fintech del África subsahariana, donde varios operadores regionales están considerando adquirir o integrar plataformas de neobanca existentes en lugar de construirlas desde cero. El contexto en el que emergen estos proyectos —[super-apps, wallets, plataformas marketplace](/es/blog/lanzar-super-app-africa-occidental)— hace que la solidez técnica del activo adquirido sea determinante. Realicé este tipo de evaluación sobre una plataforma de neobanca de un proveedor europeo por cuenta de un potencial adquirente regional. Esto es lo que reveló la TDD —y lo que enseña sobre el método.

---

## Qué significa realmente «completado al 50%»

Todo análisis de madurez de producto comienza con un análisis módulo por módulo. En la plataforma evaluada, los porcentajes de finalización por componente eran aproximadamente: backend al 74%, app iOS al 48%, app Android al 39%, sistema POS al 68%, back-office al 42%.

A primera vista, parece una plataforma a medio camino. Leídas operacionalmente, son cifras de una plataforma donde los componentes más críticos para el usuario final son los menos avanzados.

La app móvil es el primer punto de contacto con los clientes finales en un mercado donde más del 80% de las transacciones financieras se realizan en el móvil. Una app Android al 39% de finalización no es una app desplegable en seis meses. Es una app cuyo alcance funcional está menos de la mitad implementado.

La lección: los porcentajes de finalización medios ocultan asimetrías críticas. Un backend sólido con interfaces incompletas es técnicamente coherente pero comercialmente paralizado.

---

## Integraciones ausentes: el punto ciego en toda due diligence técnica fintech

El segundo problema de la plataforma evaluada era aún más estructural: tres integraciones críticas estaban ausentes.

La primera: integración con el sistema local de liquidación interbancaria. Sin ella, la plataforma no puede procesar transferencias a otros bancos. Solo puede gestionar transacciones en circuito cerrado —no en el ecosistema financiero real.

La segunda: integración SWIFT para pagos internacionales. Una restricción estratégica directa para cualquier despliegue orientado a comerciantes con proveedores fuera del país.

La tercera: integración con un procesador de tarjetas para la emisión de débitos. Sin tarjetas emitidas no hay acceso a terminales de pago de comerciantes, ni interoperabilidad con las redes locales de Visa/Mastercard.

Estas tres integraciones no son funcionalidades deseables. Son requisitos legales y operativos previos a cualquier actividad de neobanca. Su ausencia significa que la plataforma de demo es un sistema de pago interno, no una neobanca desplegable.

**Lo que se mide en una TDD no son las funcionalidades entregadas. Es la distancia entre el estado actual y el estado comercialmente desplegable. Ambas métricas pueden ser muy diferentes.**

> **¿Evaluando una adquisición fintech o integrando un activo digital en su oferta?** Una due diligence técnica rigurosa lleva entre 4 y 6 semanas y puede evitar años de retraso. [Hablemos de su situación](/contact).

---

## Calidad del código: qué puede y qué no puede corregirse

La due diligence técnica también analiza la calidad intrínseca del código, independientemente del alcance funcional. Esta dimensión es frecuentemente subestimada por adquirentes no técnicos.

En la plataforma evaluada, el balance era mixto. El backend en Java y los módulos Android mostraban una arquitectura sólida, patrones coherentes y una cobertura de pruebas satisfactoria. Era código escrito por ingenieros que sabían lo que hacían.

La app iOS era menos coherente. Arquitectura menos unificada, menor cobertura de pruebas, deuda técnica visible en varios módulos. No era código para reescribir desde cero —pero sí código que requeriría una inversión considerable en refactorización antes de poder evolucionar a buen ritmo.

Esta asimetría es típica de proyectos donde los equipos no tienen el mismo tamaño por plataforma, o donde el iOS se desarrolló más tarde bajo presión de plazos. El problema de la deuda técnica en iOS en un contexto de lanzamiento acelerado: cada funcionalidad añadida sobre una base frágil aumenta el riesgo de regresión y ralentiza la entrega.

La lección: la calidad del código es una variable económica. Determina el coste y la velocidad del desarrollo futuro. Un código excelente al 50% de finalización vale más que un código mediocre al 80%.

---

## Riesgo de dependencia de proveedor en infraestructura africana

La plataforma utilizaba una arquitectura estrechamente acoplada a AWS, con servicios gestionados integrados en la propia lógica de la aplicación —no solo en la capa de infraestructura.

En un contexto de despliegue europeo con infraestructura cloud estable, es una decisión tecnológica aceptable. En un contexto africano —donde la conectividad puede ser limitada, donde los costes de AWS en dólares pesan de forma diferente en un modelo de negocio en moneda local, y donde algunos reguladores imponen requisitos de residencia de datos— esto es un riesgo estratégico.

El acoplamiento fuerte a un proveedor cloud significa que migrar a una arquitectura híbrida o a infraestructura local requiere una reescritura parcial, no un simple cambio de configuración. El coste de ese riesgo no es visible en una demo. Es visible en los contratos de AWS, las configuraciones de servicios y los patrones de llamadas a la API en el código.

La plataforma también utilizaba una blockchain privada basada en tecnología MultiChain para su registro de transacciones y activos digitales. Es una decisión de arquitectura técnicamente defendible. Pero exige que el adquirente comprenda las implicaciones de gobernanza: ¿quién controla los nodos? ¿Cuál es el plan de continuidad si el proveedor original desaparece? ¿Cómo se interfaza este registro con los sistemas regulatorios locales?

Estas preguntas aparecen después de la demo. Nunca durante ella.

---

## Lo que el roadmap (o su ausencia) revela sobre la gobernanza del producto

Durante la misión, se solicitó desde el principio el roadmap de producto para los próximos 12 meses. Nunca fue facilitado.

Esto no es anecdótico. Una plataforma sin roadmap es una plataforma sin mecanismo de dirección. Puede significar varias cosas: un equipo de producto que reacciona a peticiones sin visión a largo plazo, una cortina de humo comercial por parte del proveedor, o una organización donde tecnología y negocio no hablan el mismo idioma.

En los tres casos, es una señal de riesgo operativo para el adquirente. Lo que se compra no es solo el código actual —es la capacidad del equipo para continuar evolucionando ese código según un plan coherente.

La ausencia de roadmap en un contexto de due diligence indica que o bien no existe, o bien el proveedor no quiere compartirlo. En ambos casos, el adquirente debe adoptar una hipótesis conservadora sobre la brecha restante a cubrir.

---

## Qué revela la due diligence técnica: ¿construir, comprar o asociarse?

Toda due diligence técnica debe conducir a una decisión. En este caso, tres opciones estaban sobre la mesa.

**Adquirir y completar**: continuar el desarrollo con los equipos existentes, apuntando a un lanzamiento comercial. La estimación técnica era de 12 meses adicionales y 6 desarrolladores más para cerrar la brecha funcional y cubrir las integraciones ausentes. El coste total supera lo que el modelo de precio original anticipaba.

**Construir desde cero**: arrancar con una plataforma greenfield, utilizando potencialmente componentes de API banking disponibles en el mercado (actores como [Mambu](https://www.mambu.com) o proveedores locales de BaaS). Mínimo 18 a 24 meses —pero con un alcance funcional y una arquitectura adaptados desde el primer día al mercado objetivo.

**Asociarse con un operador existente**: en algunos mercados africanos, desplegar un monedero de neobanca es más rápido a través de una alianza con un operador de dinero móvil ya establecido que construyendo infraestructura propia. Es una disyuntiva entre control y velocidad que también afecta a la [estructura jurídica del joint venture](/es/blog/estructurar-joint-venture-internacional-2022-01-10). Es el tipo de decisión que ayudamos a estructurar en nuestras [misiones de management de transición](/management-de-transition).

| Opción | Plazo estimado | Control | Coste inicial |
|---|---|---|---|
| Adquirir y completar | 12+ meses | Total | Alto |
| Construir desde cero | 18–24 meses | Total | Muy alto |
| Asociarse con operador | 3–6 meses | Parcial | Moderado |

La TDD no prescribe qué opción elegir. Proporciona al decisor los datos para elegir con pleno conocimiento de causa.

---

## Los 8 puntos de control de una due diligence técnica fintech rigurosa

Una due diligence técnica fintech bien conducida cubre sistemáticamente ocho dimensiones. Las presentamos por orden de impacto en la decisión de adquisición.

1. **Tasa de finalización por componente** — no una tasa global, sino componente por componente (backend, móvil iOS, móvil Android, POS, back-office, API de socios). La asimetría entre componentes suele ser más reveladora que la media.

2. **Integraciones regulatorias presentes y ausentes** — ¿qué conexiones existen con el sistema bancario local, las redes de tarjetas, los sistemas interbancarios regionales? Es la lista de prerequisitos legales para la actividad, no funcionalidades opcionales.

3. **Calidad del código y arquitectura** — revisión de código por módulo, cobertura de pruebas, deuda técnica, coherencia de patrones. Debe realizarla ingenieros, no consultores generalistas.

4. **Dependencias y lock-in de proveedor** — proveedores cloud, librerías propietarias, servicios de terceros sin alternativa, restricciones de licencia. Un producto estrechamente acoplado a AWS tiene un valor diferente en un mercado con infraestructura cloud madura frente a uno con conectividad limitada.

5. **Seguridad y cumplimiento normativo** — gestión de datos personales, cifrado, registros de auditoría, cumplimiento de requisitos locales de residencia de datos (RGPD europeo o equivalentes locales).

6. **Gobernanza del producto** — roadmap disponible y realista, proceso de lanzamiento documentado, backlog priorizado, prácticas de gestión de incidencias. La ausencia de estos elementos predice problemas de entrega futura con tanta fiabilidad como cualquier bug.

7. **Escalabilidad de la arquitectura** — ¿puede el sistema gestionar 10 veces la carga actual? ¿Cuáles son los cuellos de botella identificados? ¿Qué inversiones en infraestructura se requieren para escalar?

8. **Equipo y retención** — ¿quiénes son los contribuidores clave al código? ¿Cuál es su situación contractual? Un software cuyos dos desarrolladores clave no estarán disponibles seis meses después de la adquisición es un software de alto riesgo.

Esta lista no es exhaustiva. Cubre las preguntas que cambian una decisión de adquisición. Es el tipo de due diligence que estructuramos en nuestras [misiones de evaluación de activos tecnológicos](/management-de-transition), antes de las decisiones más determinantes.

---

## Lo que la TDD fintech revela sistemáticamente

Tres hallazgos se repiten en todas las due diligences técnicas de plataformas fintech:

**La brecha entre finalización y desplegabilidad es siempre mayor de lo declarado.** Los fundadores evalúan honestamente su tasa de finalización respecto a las especificaciones. Evalúan con menos honestidad la distancia entre las especificaciones y la desplegabilidad comercial —especialmente en integraciones regulatorias y restricciones de infraestructura local.

**Los equipos que construyen para el mercado europeo no están construyendo para África.** No es un defecto —es la realidad. Restricciones de infraestructura, regulación local, modelos de negocio en moneda local, distribución de usuarios mobile-first con perfiles de uso distintos: todo ello requiere ajustes que ni el código ni el equipo han anticipado.

**La gobernanza del producto es legible en la calidad de la documentación.** Sin roadmap, documentación técnica incompleta, sin tests de regresión: son indicadores de gobernanza del producto, no solo brechas técnicas. Predicen la capacidad de entrega fiable a lo largo del tiempo.

La due diligence técnica fintech no es un ejercicio académico. Es una decisión de inversión. Y como toda decisión de inversión, vale lo que realmente mide.

**¿Gestionando una adquisición tecnológica o la evaluación de una plataforma fintech? [Póngase en contacto](/contact) para estructurar el enfoque.**

---

*Este análisis se basa en la experiencia de llevar a cabo una due diligence técnica completa sobre una plataforma de neobanca en el marco de un proceso de adquisición para un operador regional. Los datos de finalización y estimaciones han sido generalizados. Fuentes de referencia: [GSMA Mobile Money Report](https://www.gsma.com/solutions-and-impact/connectivity-for-good/mobile-for-development/gsma_resources/state-of-the-industry-report-on-mobile-money/), [World Bank Global Findex Database](https://www.worldbank.org/en/programs/globalfindex), [BCEAO](https://www.bceao.int).*
