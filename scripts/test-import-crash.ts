
// Mock missing env var
delete process.env.RESEND_API_KEY;

async function testImport() {
    console.log("Attempting to import mail library without API KEY...");
    try {
        const mail = await import("../src/lib/mail");
        console.log("Import successful!");
    } catch (error) {
        console.error("Import failed as expected:", error.message);
    }
}

testImport();
