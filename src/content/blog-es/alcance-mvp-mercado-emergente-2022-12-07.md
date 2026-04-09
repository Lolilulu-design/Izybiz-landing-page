---
title: "Alcance del MVP en mercados emergentes: lo que haríamos distinto"
description: "Definir el alcance de un MVP en un mercado emergente es más difícil de lo que parece: trampas de alcance, dependencias externas y métricas que importan. Aprenda cómo hacerlo bien."
pubDate: 2022-12-07
lang: "es"
translationKey: "2022-12-07"
---

Hay una frase que se escucha con frecuencia en proyectos de lanzamiento de producto: "Lo resolvemos en producción." Es casi siempre la frase que precede a seis meses de retrasos y un presupuesto duplicado.

Definir el alcance de un MVP — producto mínimo viable — suena simple en teoría. Se define el ámbito mínimo para contrastar la hipótesis central. Se lanza rápido. Se aprende. Se ajusta.

En la práctica, en un proyecto de super app en un mercado emergente, "definir el alcance del MVP" es una de las decisiones más difíciles de todo el proyecto. Porque el mercado es menos predecible. Porque las alianzas condicionan el alcance. Porque las dependencias regulatorias y técnicas se encadenan de formas que nadie anticipa del todo.

Esto es lo que habría hecho de otra manera al definir el alcance del MVP para una plataforma social y financiera en África Occidental, con dieciocho meses de ejecución a mis espaldas. Este tipo de [misión de management de transición en transformación digital](https://izybiz.fr/management-de-transition) es donde nacen las lecciones de producto más duraderas. El contexto completo de este programa se describe en el artículo sobre [lanzar una super app en África Occidental](/es/blog/lanzar-super-app-africa-occidental).

---

## La trampa del MVP con "todas las funcionalidades"

El primer problema con nuestro alcance de MVP era que no era realmente un MVP.

Sobre el papel, la lista de funcionalidades "mínimas" incluía: un servicio de pago móvil integrado, una capa de mensajería, un catálogo de e-commerce, un módulo de microcrédito, una interfaz para comerciantes, una interfaz para repartidores, y un sistema de notificaciones multicanal (push, SMS, USSD).

A eso se le llama un "MVP" cuando se ha sobrevendido el proyecto a los inversores antes de decidir qué era realmente contrastable en primer lugar.

La pregunta real de un MVP no es "¿qué funcionalidades hacen falta para lanzar?" Es: **¿cuál es la hipótesis central del proyecto, y cuál es el alcance mínimo para validarla o refutarla?**

En nuestro caso, la hipótesis central era: "Los usuarios de un operador de telecomunicaciones adoptarán un servicio de pago móvil y mensajería si el acceso a la app es gratuito (zero-rated)." Todo lo demás — los módulos de e-commerce, la interfaz de repartidores — era secundario respecto a esa hipótesis.

Si hubiéramos planteado así la pregunta desde el principio, el MVP habría tenido un aspecto radicalmente diferente: servicio de pago móvil funcional, mensajería básica, catálogo de e-commerce simplificado, sin módulo de microcrédito. Entregable en 3 meses, no en 9.

---

## Lo que "dependencias externas" significa realmente

El segundo problema fue subestimar el peso de las dependencias externas sobre la definición del alcance.

Un MVP para un marketplace con cartera digital en África Occidental no depende solo de su equipo de desarrollo. Depende de al menos cuatro actores externos cuyos plazos no están bajo su control.

**El operador de telecomunicaciones.** El zero-rating — acceso gratuito a la app sin consumir la franquicia de datos del usuario — es una de las grandes ventajas competitivas del modelo. Pero activarlo requiere que el operador complete la integración técnica en su extremo. En nuestro caso, eso llevó más del doble del tiempo estimado al inicio del proyecto.

**El banco socio.** Una cartera digital requiere aprobación del Banco Central. La aprobación requiere una alianza con un banco local. El banco local impone sus propios plazos de KYC, sus propios procesos de validación de comerciantes y sus propios requisitos de documentación. Esos plazos son incomprimibles.

**Los comerciantes.** No se lanza un marketplace sin comerciantes. Reclutar, formar e incorporar una base inicial de comerciantes — incluso pequeña — requiere tiempo de campo que ningún documento de planificación de producto modela.

**Los socios de entrega.** Si el modelo incluye reparto, los socios logísticos tienen sus propias restricciones de integración: seguimiento, confirmación de entrega, gestión de devoluciones.

La lección: el alcance del MVP debe definirse no en función de lo que se quiere contrastar, sino de lo que se puede entregar dadas las dependencias reales. Cualquier funcionalidad que dependa de un actor externo con plazos inciertos debe eliminarse del MVP o tratarse como un riesgo crítico documentado.

---

## La expansión de alcance — y por qué a menudo es culpa propia

Existe una forma de expansión de alcance que recibe menos atención: la que uno mismo genera.

En un proyecto de super app, el producto sirve a varios grupos de interés simultáneamente — el operador de telecomunicaciones que quiere diferenciarse, los comerciantes que quieren un back-office sencillo, los clientes que quieren una experiencia fluida, los repartidores que quieren una herramienta de gestión de pedidos. Cada parte tiene necesidades legítimas. Y cada una tiende a creer que sus necesidades están contempladas en el MVP.

La tentación, cuando uno es CEO y quiere mantener la confianza de los socios, es decir que sí a cada solicitud. "Podemos integrar eso." "Lo añadimos antes del lanzamiento." "No tardará mucho en construirse."

Esas frases matan proyectos. No de golpe. Por acumulación.

Lo que funciona: **un documento de alcance firmado** con una lista explícita de lo que está en el MVP y lo que está en el backlog. No un Google Doc compartido en modo solo lectura. Un documento que cada socio haya validado formalmente. Esa formalidad crea un punto de referencia cuando llegan las solicitudes — y siempre llegan.

> **¿Está definiendo el alcance de un MVP ahora mismo y nota que se expande?** Una perspectiva externa sobre el encuadre inicial puede evitar meses de retraso. [Hablemos](https://izybiz.fr/contact).

---

## Priorización de producto en mercados emergentes: qué es diferente

En un mercado maduro, la priorización de producto sigue marcos consolidados — MoSCoW, RICE, Kano. Se evalúa el valor para el usuario, el esfuerzo de desarrollo y se toman decisiones de compromiso.

En un mercado emergente, hay una cuarta dimensión que esos marcos no contemplan: **las restricciones de infraestructura**. Algunas funcionalidades no pueden entregarse no porque sean complejas de construir, sino porque la infraestructura local no puede soportarlas.

Algunos ejemplos concretos de nuestro proyecto:

- **Las notificaciones push** asumen que los usuarios tienen un smartphone con conexión estable. En una base de usuarios donde una parte significativa utiliza teléfonos básicos, el SMS sigue siendo el único canal fiable. Construir primero un sistema rico de notificaciones push significa optimizar para el segmento minoritario.

- **Los catálogos fotográficos** asumen suficiente ancho de banda para cargar imágenes de calidad. Con conexiones 2G o 3G inestables, un catálogo basado en texto suele rendir mejor que uno visual.

- **Los pagos integrados en la app** asumen una integración de mobile money completamente funcional. Mientras se espera esa integración, un mecanismo de pago contra reembolso permite contrastar el modelo de pedidos sin quedar bloqueado en la capa de pagos.

El principio correcto de priorización en mercados emergentes: **empezar por lo que funciona en la infraestructura más restringida** y desbloquear progresivamente funcionalidades más ricas a medida que la infraestructura mejora y la base de usuarios se conoce mejor.

---

## Qué medir desde el primer día — y qué deberíamos haber medido

Habíamos definido KPIs de lanzamiento. Número de usuarios registrados, comerciantes activos, volumen de transacciones. Métricas clásicas.

Lo que deberíamos haber medido desde el primer día: **los comportamientos que validan o invalidan la hipótesis central**.

Si la hipótesis es "los usuarios adoptan una plataforma de pagos móviles y mensajería cuando el acceso es gratuito", las métricas relevantes son:
- Tasa de apertura de la app (indicador de la ventaja del zero-rating)
- Tasa de activación de pago móvil (adopción del núcleo del producto)
- Frecuencia de mensajería (prueba de la alternativa a las apps dominantes)
- Tasa de conversión mensajería → transacción financiera (validación de la lógica integrada)

Estas métricas son distintas del volumen de transacciones o del número de usuarios registrados. Miden el comportamiento que el modelo intenta crear — no el volumen que genera una vez asentado.

Un MVP sin instrumentación que mida la hipótesis central no es un MVP. Es un lanzamiento.

---

## La estructura de equipo que permite aprender rápido

Un MVP solo tiene valor si la organización puede extraer aprendizaje de él y actuar con rapidez.

En nuestra organización, el ciclo aprendizaje-decisión-ejecución era demasiado largo. Los datos de campo llegaban a los equipos de producto en Europa con un retraso de varios días. Las decisiones de ajuste de producto pasaban por un proceso de validación con varios interlocutores. Los ciclos de sprint eran de dos semanas.

Lo que un equipo de MVP en un mercado emergente debe poder hacer:
- **Recoger feedback de campo el mismo día** — no a través de un panel centralizado, sino mediante conversaciones directas entre los responsables de producto y los equipos locales.
- **Tomar una decisión de ajuste en 48 horas** — sin esperar a la próxima reunión de planificación de sprint.
- **Lanzar una corrección crítica en una semana** — no en un ciclo estándar de dos semanas.

Esto requiere un equipo reducido con roles claros, un responsable de producto con autoridad para decidir sin escalar sistemáticamente, y un equipo de desarrollo que pueda priorizar correcciones sin romper su ritmo de base. Esta es precisamente la configuración que una [misión de scale-up e industrialización](https://izybiz.fr/scale-up-industrialisation) permite: procesos claros, equipo autónomo, liderazgo que decide rápido.

| Lo que hicimos | Lo que repetiríamos |
|---|---|
| MVP con alcance "completo" | Alcance limitado a la hipótesis central |
| Dependencias externas no documentadas | Dependencias tratadas como riesgos críticos |
| KPIs de volumen | KPIs de comportamiento ligados a la hipótesis |
| Ciclo de feedback quincenal | Ciclo de feedback diario sobre el terreno |
| Validación informal de socios | Documento de alcance firmado formalmente |

---

## Lo que un MVP revela de verdad

Un MVP bien dimensionado no revela si su producto es bueno. Revela si su hipótesis sobre el usuario es correcta.

Es una distinción importante. Un producto puede ser técnicamente excelente y fracasar porque la hipótesis original era errónea. Un producto puede ser técnicamente imperfecto y triunfar porque resuelve exactamente el problema correcto.

En mercados emergentes, las hipótesis son más difíciles de validar de antemano porque los datos de mercado son más escasos, los comportamientos de los usuarios están menos documentados y las restricciones de infraestructura son menos predecibles. Por eso mismo el alcance MVP debe ser mínimo — para que el coste de una hipótesis errónea sea lo más bajo posible.

La buena noticia: los mercados emergentes son más tolerantes con los productos imperfectos que los mercados maduros, siempre que uno esté presente, escuche e itere con rapidez. La tecnología no marca la diferencia. Lo que marca la diferencia es la velocidad de aprendizaje.

Esta lógica trasciende los mercados emergentes. Cualquier entorno en construcción — un sector en transformación, una organización que adopta un nuevo modelo operativo, un mercado B2B sin referentes establecidos — exige la misma postura: hipótesis clara, alcance mínimo, ciclo de aprendizaje rápido.

**¿Está lanzando un producto digital en un mercado emergente o complejo y necesita un marco operativo? [Escríbanos](https://izybiz.fr/contact).**

---

*Relato basado en la definición del alcance y la gestión de un MVP para una plataforma social y financiera para un operador regional en África Occidental.*
