# Army Robot Challenger Test

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm run start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## About project

This project Challenger is about a make 2 view whit this require:

### Vista 1 – Búsqueda y tabla

Vista principal con una tabla con todos los robots. En mobile debe
mostrar solamente id y name; en desktop el id, name, salary y age.
Además, los datos de la tabla deben poder filtrarse, con un search box
por nombre, un slider por edad y un slider por salario. En el id de cada
usuario debe haber un enlace a la vista 2.
También se necesita un botón de LIMPIAR filtros.

### Vista 2 – Detalles, edición y borrado

El equipo humano necesita una vista que muestre los detalles del robot
que se seleccionó en la vista 1. Debe mostrar inputs de: id
(deshabilitado), nombre, salario, edad e imagen. La imagen debe ser
obtenida de este API: https://robohash.org/{employee_name}
El nombre, salario y edad deben poder editarse. Y el request de
actualización debe enviarse con un botón GUARDAR, para saber que
el request se envió se necesita mostrar una notificación que muestre el
message de la respuesta del API.
También se necesita un botón BORRAR que envie el request DELETE, y
mostrar la notificación con el message de la respuesta del API.

## Considerations Web App

Utiliza el poder de
ReactJS, si sabes
AntD ¡Aún mejor!
La creatividad está
en ti, estilos y colores
están totalmente a tu
disposición.
Recuerda que
nuestro equipo
humano necesita una
interfaz con la mejor
experiencia de
usuario (user friendly).
Considera que
nuestro equipo
utilizará la interfaz
web desde su
computadora, móvil
y tablet (responsive).

## App.js

```
import React, { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { fetchData } from "./redux/dataRobots"
import Home from "./pages/home"
import Details from "./pages/details"

import "antd/dist/antd.css"
import Header from "./components/header"

function App() {
  const dispatch = useDispatch()
  const [pagination, setPagination] = useState(true)

  useEffect(() => {
    const despachar = () => {
      dispatch(fetchData())
    }
    despachar()
  }, [dispatch])

  const actualView = pagination ? (
    <Home setPagination={setPagination} />
  ) : (
    <Details setPagination={setPagination} />
  )
  return (
    <div>
      <Header />
      <div className="container h-screen">{actualView}</div>
    </div>
  )
}

export default App
```
