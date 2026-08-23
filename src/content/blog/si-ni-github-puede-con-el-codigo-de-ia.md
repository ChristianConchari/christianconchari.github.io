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

El 17 de agosto de 2026, GitHub estuvo caído casi ocho horas. No fue un mal despliegue ni un error de configuración. Fue simplemente falta de capacidad: el autoscaling no había logrado ajustarse al cambio que los agentes de IA provocaron en el patrón de tráfico, sumado a un bug de reintentos en cadena que multiplicó por diez el tráfico de autenticación. Era el segundo incidente grave de la plataforma ese mes, y coincidió con una curva de crecimiento que nadie había dimensionado del todo. Los commits mensuales en la plataforma ya se habían duplicado: de 1400 millones en abril a 2900 millones en agosto, mientras que los pull requests abiertos solo por agentes de IA pasaron de unos 4 millones a más de 17 millones en los seis meses anteriores.

Si la infraestructura detrás de la plataforma de código más grande del mundo, con ingenieros cuyo trabajo de tiempo completo es escalar sistemas como este, se vio sorprendida por ese volumen, ¿qué le está pasando a un equipo de cinco personas sin un área de platform engineering detrás? El autoscaler de GitHub se arregla, tarde o temprano. El criterio de ingeniería no escala de la misma forma.

Hace un par de años, escribir una función completa, con sus pruebas y su documentación, podía tomarte una tarde. Hoy se lo pides a un agente y lo tienes en minutos. Copilot, Cursor, Claude Code y el resto dejaron de ser asistentes que autocompletan líneas. Generan módulos enteros, refactorizan arquitecturas y a veces proponen una solución a un problema que ni siquiera terminaste de plantear.

Así que hoy se genera más código que nunca. Ese es el verdadero problema: a GitHub simplemente le tocó primero, porque a ellos les pasa a escala de infraestructura.

## Más código no es lo mismo que menos trabajo

La promesa original de la IA generativa en programación era simple: automatizar lo tedioso para que los desarrolladores se concentraran en lo que importa. Lo que pasó en la práctica fue distinto. La velocidad de generación de código se convirtió en la nueva vara con la que se mide a los equipos. Un agente escribe en una hora lo que antes tomaba un día, y la reacción no es "qué bien, ahora tenemos más tiempo libre". Es "qué bien, ahora entregamos cinco veces más funcionalidades en el mismo sprint".

Los sprints no se alargaron para dejar espacio para revisar con calma lo que produce la IA. Se acortaron, asumiendo que si el código llega más rápido, todo el ciclo debería acelerarse igual. Pero escribir código nunca fue el cuello de botella real. Nada de eso se acelera solo porque el código aparezca antes: entender el problema, diseñar algo que encaje, revisar con criterio. Ese trabajo sigue ahí. Solo que ahora hay menos tiempo para hacerlo.

## La carga invisible: revisar, entender y sostener lo que la IA escribe

Cuando un agente genera código, alguien tiene que leerlo, entenderlo y responder por él. Ese alguien es el programador. Solo que ahora revisa el triple de código en el tiempo que antes dedicaba a escribir una fracción de eso. La velocidad de generación dejó muy atrás a la velocidad humana de comprensión, y los desarrolladores están absorbiendo esa brecha en silencio.

Esto lo vivo de primera mano. Hoy paso mucho más tiempo revisando código que escribiéndolo, y ni siquiera revisar es el verdadero trabajo. Lo que en realidad estoy chequeando es si lo que se mergeó respeta la arquitectura, si sigue las prácticas que se supone que el proyecto exige, si está construido para durar o solo para pasar el ticket. Los plazos de entrega se siguen achicando, las expectativas siguen subiendo, y hay una sensación creciente de que casi nada está fuera de alcance porque "la IA se encarga de la parte difícil". En realidad no es así. La parte difícil nunca fue escribir sintaxis. Era el criterio arquitectónico: saber si una solución realmente pertenece al sistema donde va a vivir, y si está pagando deuda técnica o sumándola en silencio. El throughput subió. Ese criterio no lo acompañó.

Los equipos ya sienten esto en otros frentes también: la deuda técnica antes se acumulaba a lo largo de varios sprints. Ahora se acumula en días, porque el volumen de código nuevo es tan grande que nadie tiene tiempo de detenerse a preguntar si una solución generada automáticamente realmente encaja donde terminó.

## Un ritmo que no da tregua

Antes, un desarrollador podía justificar una demora señalando un problema difícil: hacía falta investigar, el diseño requería cuidado. Ese argumento hoy pesa menos frente a la pregunta obvia: ¿por qué no le pides a la IA que lo resuelva? La conversación sobre plazos razonables se volvió más difícil de sostener. El trabajo no se simplificó; lo que cambió fue la percepción de lo razonable, que avanzó más rápido que el trabajo mismo.

El programador de hoy pasa más tiempo revisando lo que hizo el agente que decidiendo qué construir después: corrigiendo sus suposiciones equivocadas, sobre todo, y armando el contexto que necesita para entender el problema real. Sigue cargando con la responsabilidad cuando algo falla en producción. Es más trabajo cognitivo, no menos. Solo que lo llamamos más fácil porque desapareció la parte de tipear.

## Lo que de verdad está en juego

Hay una narrativa circulando según la cual la IA va a terminar con los programadores. Mira los números y encontrarás lo contrario: el trabajo no está desapareciendo, se está multiplicando. Nunca hubo tanta demanda de gente que sepa construir, mantener y hacer crecer software. La escasez de trabajo no es el problema.

Debajo de eso hay un problema más silencioso. Si la IA termina sacando a los programadores del juego, no será por falta de trabajo, que hay más que nunca. Será porque el lado de la revisión colapsó bajo un volumen que nadie planificó.

## ¿Dónde deja esto a los equipos?

El instinto es arreglar esto con más IA: un agente revisando lo que produjo otro agente. Eso ayuda, pero solo de forma marginal. No toca el desbalance real, que es que la generación se automatizó y el criterio no. Los equipos que van a salir adelante acá no van a ser los que generen más código, y tampoco van a ganar por revisar más rápido o más duro. Van a ser los que traten la gobernanza de arquitectura como algo innegociable, que sigan exigiendo las prácticas que hacen que un código sea mantenible y no solo funcional, y que midan la deuda técnica a propósito en vez de descubrirla en medio de un incidente. La revisión es solo el checkpoint. Lo que de verdad protege —un sistema que siga teniendo sentido dentro de dos años— es la parte que nadie automatizó.

Publicar más código generado por IA del que tu equipo puede realmente gobernar todavía no se siente como deuda. Se va a sentir. La única pregunta abierta es si te enteras a tu propio ritmo, o al ritmo de un outage.
