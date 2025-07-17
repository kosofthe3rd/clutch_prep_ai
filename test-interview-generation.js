const testInterviewGeneration = async () => {
  const testData = {
    type: "Technical",
    role: "Frontend Developer",
    level: "Junior",
    techstack: "React, TypeScript, Next.js, Tailwind CSS",
    amount: 5,
    userid: "test-user-123"
  };

  try {
    console.log('🧪 Testing interview generation...');
    console.log('📤 Sending data:', JSON.stringify(testData, null, 2));
    
    const response = await fetch('https://clutch-prep-ai.vercel.app/api/vapi/generate', {
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
      console.log('✅ Interview generated successfully!');
      console.log('🔗 You should now be able to view the interview');
    } else {
      console.log('❌ Interview generation failed');
    }
    
  } catch (error) {
    console.error('💥 Error:', error.message);
  }
};

testInterviewGeneration(); 