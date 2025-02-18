import skate2 from "/skate2.jpg"

const SobreNosotros = () => {
    return (
        <section className="bg-gray-100 mt-10">
            <div className="container mx-auto py-16 px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8">
                    <div className="max-w-lg">
                        <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Sobre Nosotros</h2>
                        <p className="mt-4 text-gray-600 text-lg">
                            En <strong>VintageNL</strong>, vivimos el skate y el surf como un estilo de vida.
                            Nacimos entre olas y calles, buscando la mejor forma de deslizarnos y expresarnos.
                            No somos solo una tienda, somos una comunidad de riders que desafían límites y buscan la mejor calidad
                            en cada tabla, rueda y traje de neopreno.
                            Si sientes la libertad de una ola o el asfalto bajo tu tabla, ya eres parte de nuestra tribu.
                        </p>

                    </div>
                    <div className="mt-12 md:mt-0">
                        <img src={skate2} alt="Sobre Nosotros" className="object-cover rounded-lg shadow-md" />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SobreNosotros