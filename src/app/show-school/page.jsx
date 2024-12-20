
const fetchSchools = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/schools`);
  const data = await response.json();
  console.log(data);
  return data.schools;
};

const ShowSchoolsPage = async () => {
  const schools = await fetchSchools();
  if (schools.length === 0) {
    return (
      <div>
        <h1>No school found</h1>
      </div>
    );
  }
  return (
    <div className="w-full flex justify-center flex-col items-center mx-auto py-4 max-w-6xl">
      <h1 className="text-2xl font-bold mb-4">School List</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {schools?.map((school) => (
          <div key={school.id} className="border rounded p-4">
            <img
              src={school.image}
              alt={school.name}
              className="w-full h-52 object-cover mb-2"
            />
            <h2 className="text-xl font-bold">{school.name}</h2>
            <p>{school.address}</p>
            <p>{school.city}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowSchoolsPage;
