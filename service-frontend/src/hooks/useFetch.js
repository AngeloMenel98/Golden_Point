import { useEffect, useState } from "react";
import axios from "axios";



/**
 * useFetch: proporciona una forma conveniente de realizar solicitudes HTTP GET en componentes de React, manejar el estado 
 * de carga y errores, y ofrecer una función para volver a cargar los datos cuando sea necesario.
 * 
 * 1. Se importan useEffect y useState de React, asi como Axios para manejar las solicitudes HTTP.
 * 2. Se define la función useFetch que toma una URL como parametro.
 * 3. Se inicializan tres estados utilizando useState:
 *      data: para almacenar los datos recuperados de la solicitud.
 *      loading: para indicar si la solicitud está en curso.
 *      error: para almacenar cualquier error que ocurra durante la solicitud.
 */
const useFetch = (url) => {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);


  /**  
   * useEffect: este efecto se ejecuta cuando el componente se monta (debido a la matriz de dependencias vacía []), 
   * lo que significa que se ejecutará solo una vez después de que el componente se monte en el DOM. 
   * Dentro de este efecto tenemos:
   *    Se define una función fetchData asincrónica que realiza la solicitud GET utilizando Axios.
   *    Se establece loading en true para indicar que la solicitud está en curso.
   *    Se intenta realizar la solicitud GET y se espera la respuesta.
   *    Si la solicitud es exitosa, los datos se establecen en el estado data utilizando setData.
   *    Si la solicitud falla, se captura el error y se establece en el estado error utilizando setError.
   *    Finalmente, se establece loading en false para indicar que la solicitud ha terminado.
  */
  useEffect(() => {
    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await axios.get(url);
            setData(res.data);
        } catch (err) {
            setError(err);
        }
    setLoading(false);
    };
    fetchData();
  }, []);



  /**
   * reFetch: realiza una nueva solicitud GET a la misma URL. Esta función se puede llamar manualmente 
   * cuando sea necesario para volver a cargar los datos.
   */
  const reFetch = async () => {
    setLoading(true);
    try {
        const res = await axios.get(url);
        setData(res.data);
    } catch (err) {
        setError(err);
    }
    setLoading(false);
  };

  
/**
 * El hook devuelve un objeto con cuatro propiedades:
 *      data: datos recuperados de la solicitud.
 *      loading: indicador booleano que indica si la solicitud está en curso.
 *      error: cualquier error que ocurra durante la solicitud.
 *      reFetch: función que se puede llamar para volver a realizar la solicitud y actualizar los datos.
 */
  return { data, loading, error, reFetch };
};

export default useFetch;