const employee_TData = "employeesData";
function add(employeesData) {
    localStorage.setItem(employee_TData, JSON.stringify(employeesData));
}
function get() {
    return localStorage.getItem(employee_TData) !== null ? JSON.parse(localStorage.getItem(employee_TData)) : [];
}
function getAllEmployees() {
    return get();
}
function addEmployee(employeeData) {
    employeeData.id = getMaxId();
    const employeesData = getAllEmployees();
    employeesData.push(employeeData);
    add(employeesData);
}
function getMaxId() {
    const employeesData = getAllEmployees();
    if (employeesData.length > 0) {
        const ids = employeesData.map(x => x.id);
        max = Math.max.apply(null, ids);
        return max + 1;
    }
    else {
        return 1;
    }
}
function deleteEmployeeById(id) {
    const records = getAllEmployees();
    const record = records.filter(x => x.id !== id);
    add(record);
}
function getEmployeeById(id) {
    const records = getAllEmployees();
    const record = records.find(x => x.id === parseInt(id));
    return record;
}
function updateEmployee(record) {
    const records = getAllEmployees();
    const existingRecord = records.find(x => x.id === parseInt(record.id));
    const index = records.indexOf(existingRecord);
    records[index] = record;
    add(records);
}



