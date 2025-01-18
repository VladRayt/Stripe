import React, { useState } from 'react';
import { Button } from 'react-native';

export function BuggyComponent(): React.ReactNode {
    const [shouldError, setShouldError] = useState(false);

    if (shouldError) {
        throw new Error('Це тестова помилка!');
    }

    return (
        <Button
            title="Викликати помилку"
            onPress={() => setShouldError(true)}
        />
    );
}
