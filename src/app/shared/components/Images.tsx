
const Images = (images : string[]) => {
  return (
    <div className="row" id="apiR">
    {
        images.map((img) => (
            <div className="col-md-4 col-12">

                <div className="card mt-5">
                    <img src={img} alt="Foto de perro "/>
                    <div className="card-body">
                        <h5 className="card-title">name</h5>
                    </div>
                </div>
            </div>
        ))

    }
    </div>
  )
}

export default Images