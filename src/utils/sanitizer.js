export const sanitize = (data) => {
    const {password, role, ...sanitizedData} = data
    
    return sanitizedData;
};