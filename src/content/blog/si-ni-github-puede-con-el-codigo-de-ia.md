---
title: "Si ni GitHub puede con el código que genera la IA, tú tampoco"
description: "Una caída reciente de GitHub muestra qué pasa cuando el código generado por IA crece más rápido que la infraestructura construida para manejarlo — y por qué ese mismo desbalance está cayendo sobre los developers, no solo sobre los servidores."
pubDate: 2026-08-22
tags: ["AI Agents", "Software Engineering", "Career"]
readingTime: 5
featured: true
lang: "es"
translationKey: "github-outage-ai-code-review-debt"
---

El 17 de agosto de 2026, GitHub estuvo caído casi ocho horas. No fue un mal despliegue ni un error de configuración: el [propio post-mortem de GitHub apuntó a](https://www.theregister.com/saas/2026/08/19/github-blames-8-hour-outage-on-autoscaling-fail-and-vs-code-retry-storm/5289547) una falta de capacidad. El autoscaler no se ajustó al cambio que los agentes de IA provocaron en el patrón de tráfico, y un bug de reintentos en cadena en el flujo de autenticación de Copilot en VS Code multiplicó por diez el tráfico de autenticación. Fue el segundo incidente grave ligado a carga de IA en tres meses. La curva de crecimiento detrás tampoco estaba bien dimensionada: [los commits mensuales en la plataforma ya se habían duplicado](https://blog.pragmaticengineer.com/the-pulse-ai-load-breaks-github/), de 1400 millones en abril a 2900 millones en agosto, mientras que [los pull requests abiertos solo por agentes de IA pasaron](https://www.danilchenko.dev/posts/2026-04-11-github-ai-agents-pull-requests/) de unos 4 millones a más de 17 millones en los seis meses anteriores.

Esto debería preocuparte más que el outage en sí: la falla de GitHub no fue aleatoria, fue un problema de dimensionamiento. Nadie modeló cómo se vería el tráfico una vez que los agentes, no los humanos, empezaran a generar la mayoría de las solicitudes. Ahora hazte la misma pregunta sobre tu propio equipo. Entender un requerimiento lo suficiente como para resolver el problema correcto, diseñar algo que realmente encaje en el sistema, evitar que la deuda técnica se acumule: esa capacidad se dimensionó para un mundo donde el código llegaba a la velocidad humana. Ese mundo ya no existe. El autoscaler de GitHub se arregla no más. El criterio humano no escala de la misma forma.

Esa brecha no apareció de la noche a la mañana —es lo que pasa cuando las herramientas se vuelven tan buenas, tan rápido. Hace un par de años, escribir una función completa, con sus pruebas y su documentación, podía tomarte una tarde. Hoy se lo pides a un agente y lo tienes en minutos. Copilot, Cursor, Claude Code y el resto dejaron de ser asistentes que autocompletan líneas. Generan módulos enteros, refactorizan arquitecturas y a veces proponen una solución a un problema que ni siquiera terminaste de plantear.

Hoy se genera más código que nunca, y no solo en GitHub —esto está pasando en todos lados donde se escribe código. A GitHub simplemente le tocó primero, porque la infraestructura falla primero a escala.

## Más código no es lo mismo que menos trabajo

La promesa original de la IA generativa en programación era simple: automatizar lo tedioso para que los desarrolladores se concentraran en lo que importa. Lo que pasó en la práctica fue distinto. La velocidad de generación de código se convirtió en la nueva vara con la que se mide a los equipos. Un agente escribe en una hora lo que antes tomaba un día, y la reacción no es "qué bien, ahora tenemos más tiempo libre". Es "qué bien, ahora entregamos muchas más funcionalidades en el mismo sprint".

Los sprints no se alargaron para dejar espacio para entender y validar con calma lo que produce la IA. Se acortaron, asumiendo que si el código llega más rápido, todo el ciclo debería acelerarse igual. Pero escribir código nunca fue el cuello de botella real. Nada de eso se acelera solo porque el código aparezca antes: entender el problema, diseñar algo que encaje, asegurarse de que no te va a costar caro más adelante. Ese trabajo sigue ahí. Solo que ahora hay menos tiempo para hacerlo.

## La carga invisible: entender, mantener y sostener lo que la IA escribe

Cuando un agente genera código, alguien tiene que leerlo, entenderlo y responder por él. Ese alguien es el programador —solo que ahora hay el triple de código para entender en el tiempo que antes dedicaba a escribir una fracción de eso. Esto se siente si programas para ganarte la vida. Yo lo siento a diario: hoy paso mucho más tiempo tratando de entender lo que produjo un agente que el que alguna vez pasé escribiendo ese código yo mismo.

Y entender tampoco es la meta final. Un cambio puede pasar el CI, verse limpio, y aun así estar mal de una forma que ningún linter detecta: reimplementar un chequeo de permisos que ya existe tres archivos más allá, o sumar una capa de caché que rompe en silencio la garantía de invalidación de la que depende el resto del sistema. Lo que importa es si ese cambio respeta la arquitectura, sigue las prácticas que el proyecto exige, y paga deuda técnica en vez de sumarla en silencio. Ese criterio tiene que aparecer en algún punto entre leer el requerimiento y escribir la solución —y no se acelera solo porque el código llegue más rápido. El throughput subió. El criterio no lo acompañó.

La deuda técnica antes se acumulaba a lo largo de varios sprints. Ahora se acumula en días —el volumen de código nuevo es tan grande que nadie tiene tiempo de detenerse a preguntar si una solución generada automáticamente realmente encaja donde terminó.

## Un ritmo que no da tregua

Antes, un desarrollador podía justificar una demora señalando un problema difícil: hacía falta investigar, el diseño requería cuidado. Ese argumento hoy pesa menos frente a la pregunta obvia: ¿por qué no le pides a la IA que lo resuelva? Los plazos se volvieron más difíciles de defender —no porque el trabajo haya cambiado, sino porque las expectativas avanzaron más rápido que el trabajo mismo.

El programador de hoy pasa más tiempo revisando lo que hizo el agente que decidiendo qué construir después: corrigiendo suposiciones equivocadas, reconstruyendo el contexto que el agente se saltó, cargando igual con la responsabilidad cuando algo falla en producción. Es más trabajo cognitivo, no menos. Solo que se lo llama más fácil porque desapareció la parte de tipear.

## Lo que de verdad está en juego

Hay una narrativa según la cual la IA va a terminar con los programadores. Mira las mismas curvas de crecimiento detrás del outage —más commits, más PRs, más código circulando— y apuntan justo al lado contrario: la demanda de gente que sepa construir, mantener y hacer crecer software sigue subiendo, no bajando. La escasez de trabajo no es el riesgo.

El riesgo más silencioso es este: lo que sea que hoy mantiene la calidad del código y frena la deuda técnica, colapsa bajo un volumen que nadie planificó —la misma falla del autoscaler de GitHub, solo que corriendo dentro de tu equipo en vez de un datacenter.

## ¿Dónde deja esto a los equipos?

El instinto es arreglar esto con más IA: un agente revisando lo que produjo otro agente. Eso ayuda, pero solo de forma marginal. No toca el desbalance real: la automatización avanzó de un lado, el criterio se quedó quieto del otro. Los equipos que van a salir adelante no van a ser los que generen más código, y tampoco van a ganar por revisar más rápido o más duro. Van a ser los que traten la gobernanza de arquitectura como algo innegociable, que sigan exigiendo las prácticas que hacen que un código sea mantenible y no solo funcional, y que midan la deuda técnica a propósito en vez de descubrirla en medio de un incidente.

Un punto concreto por dónde empezar es entender qué proporción de tu código reciente es generado por agentes frente a cuánta deuda técnica o cuántos tickets de retrabajo se originan ahí, y si tu tasa de defectos o rollbacks se movió desde que adoptaste agentes. Si nadie está midiendo esos números, no sabes si los agentes están cerrando esa brecha o agrandándola en silencio.

La revisión es solo el checkpoint. Lo que de verdad protege —un sistema que siga teniendo sentido dentro de dos años— es la parte que nadie automatizó.

Publicar más código generado por IA del que tu equipo puede realmente gobernar todavía no se siente como deuda. Se va a sentir. La única pregunta abierta es si te enteras a tu propio ritmo, o al ritmo de un outage.
