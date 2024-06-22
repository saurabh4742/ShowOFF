export function transformSkill(value: string) {
    // Remove "Developer" from the value
    let valueWithoutDeveloper = value.replace(" Developer", "");
    
    // Split the value into words, convert them to lowercase, and join with underscores
    let transformedValue = valueWithoutDeveloper.split(' ').map(word => word.toLowerCase()).join('_');
    
    // Add "_projects" at the end
    transformedValue += '_projects';
    
    return transformedValue;
  }