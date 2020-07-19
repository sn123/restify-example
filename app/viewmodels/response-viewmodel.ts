export class ErrorModel {
    public constructor(message: string, property?: string) {
        this.message = message;
        if (property) {
            this.property = property;
        }
    }
    public property: string = '';
    public message: string;
}

export class ResponseViewModel<T> {
    public errors: ErrorModel[] = [];
    public data: T | null = null;

    public static hasErrors<T>(viewModel: ResponseViewModel<T>): boolean {
        return !viewModel || !viewModel.data || (viewModel.errors && viewModel.errors.length > 0);
    }
}
