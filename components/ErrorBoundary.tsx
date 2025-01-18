import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ThemedText } from './ThemedText';
import { logger } from '@/utils/logger';

interface Props {
    children: React.ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

export class ErrorBoundary extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
        logger.error('ErrorBoundary caught an error:', {
            error,
            errorInfo,
        });
    }

    render(): React.ReactNode {
        if (this.state.hasError) {
            return (
                <View style={styles.container}>
                    <ThemedText type="title">Щось пішло не так!</ThemedText>
                    <ThemedText style={styles.errorText}>
                        {this.state.error?.message || 'Невідома помилка'}
                    </ThemedText>
                    <ThemedText
                        type="link"
                        onPress={() => this.setState({ hasError: false, error: null })}
                    >
                        Спробувати знову
                    </ThemedText>
                </View>
            );
        }

        return this.props.children;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    errorText: {
        marginVertical: 20,
        textAlign: 'center',
    },
});
