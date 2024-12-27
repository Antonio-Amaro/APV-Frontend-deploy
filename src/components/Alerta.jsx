const Alerta = ({alerta}) => {
  return (
    <div className={`${alerta.error ? 'from-red-500 to-red-700': 'from-green-500 to-green-600'} bg-gradient-to-r text-center p-2 mt-3 text-white font-bold text-sm`}>
        {alerta.msg}
    </div>
  )
}

export default Alerta