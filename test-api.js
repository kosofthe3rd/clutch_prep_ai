const fs = require('fs');

// Function to test the API endpoint
async function testAPI(jsonFile) {
    try {
        console.log(`🧪 Testing API with ${jsonFile}...`);
        
        // Read the JSON file
        const testData = JSON.parse(fs.readFileSync(jsonFile, 'utf8'));
        console.log('📤 Sending data:', testData);
        
        const response = await fetch('http://localhost:3000/api/vapi/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(testData)
        });
        
        console.log('📥 Response status:', response.status);
        
        const result = await response.json();
        console.log('📥 Response body:', JSON.stringify(result, null, 2));
        
        if (response.ok) {
            console.log('✅ API call successful!');
        } else {
            console.log('❌ API call failed with status:', response.status);
        }
        
    } catch (error) {
        console.error('💥 Error:', error.message);
    }
}

// Test with different scenarios
async function runTests() {
    console.log('🚀 Starting API tests...\n');
    
    // Test 1: Junior Frontend Developer (Technical)
    await testAPI('test-api-data.json');
    console.log('\n' + '='.repeat(50) + '\n');
    
    // Test 2: Mid-level Software Engineer (Behavioral)
    await testAPI('test-api-data-behavioral.json');
    console.log('\n' + '='.repeat(50) + '\n');
    
    // Test 3: Senior Full Stack Developer (Technical)
    await testAPI('test-api-data-senior.json');
}

// Run the tests
runTests(); 