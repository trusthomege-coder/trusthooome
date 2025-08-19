import { useEffect, useState } from "react"
import { supabase } from "../lib/supabase"

export default function Catalog() {
  const [properties, setProperties] = useState<any[]>([])

  useEffect(() => {
    async function load() {
      const { data, error } = await supabase.from("properties").select("*")
      if (error) {
        console.error("Ошибка загрузки:", error)
      } else {
        setProperties(data || [])
      }
    }
    load()
  }, [])

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
      {properties.length === 0 ? (
        <p className="text-gray-500">Нет объектов для отображения.</p>
      ) : (
        properties.map((property) => (
          <div
            key={property.id}
            className="border rounded-2xl shadow p-4 hover:shadow-lg transition bg-white"
          >
            {/* Фото пока заглушка */}
            <img
              src="https://via.placeholder.com/400x250"
              alt={property.location}
              className="w-full h-48 object-cover rounded-xl"
            />

            <div className="mt-3">
              <h2 className="text-lg font-semibold">{property.location}</h2>
              <p className="text-gray-600">
                {property.bedrooms} спальни • {property.bathrooms} ванные
              </p>
              <p className="text-gray-600">Площадь: {property.area} м²</p>
              <p className="text-xl font-bold mt-2">{property.price} $</p>
            </div>
          </div>
        ))
      )}
    </div>
  )
}
